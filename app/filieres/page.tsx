import { Metadata } from 'next';
import { RegionFilter } from '@/components/filters/region-filter';
import { TypeFilter } from '@/components/filters/type-filter';
import { ProductFilter } from '@/components/filters/product-filter';
import { SearchInput } from '@/components/filters/search-input';
import { ExportButton } from '@/components/data-table/export-button';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DataTablePagination } from '@/components/data-table/pagination';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Filières agricoles de Guinée',
  description: 'Découvrez les filières agricoles, leurs productions et acteurs clés.'
};

const pageSize = 10;

const filiereTypes = [
  { value: 'all', label: 'Tous les types' },
  { value: 'PRODUCTION', label: 'Production' },
  { value: 'TRANSFORMATION', label: 'Transformation' },
  { value: 'EXPORT', label: 'Export' },
  { value: 'INNOVATION', label: 'Innovation' }
];

export default async function FilieresPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [user, regions, productOptions] = await Promise.all([
    getCurrentUser(),
    prisma.region.findMany({
      orderBy: { name: 'asc' }
    }),
    prisma.filiere.findMany({
      distinct: ['product'],
      select: { product: true },
      orderBy: { product: 'asc' }
    })
  ]);

  const currentPageRaw = Number(searchParams.page ?? '1');
  const currentPage = Number.isNaN(currentPageRaw) || currentPageRaw < 1 ? 1 : currentPageRaw;
  const regionId = typeof searchParams.regionId === 'string' ? searchParams.regionId : undefined;
  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  const product = typeof searchParams.product === 'string' ? searchParams.product : undefined;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  const where = {
    ...(regionId ? { regionId } : {}),
    ...(type ? { type } : {}),
    ...(product ? { product } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { product: { contains: q, mode: 'insensitive' } }
          ]
        }
      : {})
  };

  const [items, total, kpiCounts] = await Promise.all([
    prisma.filiere.findMany({
      where,
      include: {
        region: true,
        mainActor: true
      },
      orderBy: { name: 'asc' },
      skip: (currentPage - 1) * pageSize,
      take: pageSize
    }),
    prisma.filiere.count({ where }),
    prisma.regionStat.aggregate({
      _sum: {
        productionTons: true,
        transformationTons: true
      }
    })
  ]);

  const activeActors = await prisma.actor
    .count({ where: { status: { equals: 'actif', mode: 'insensitive' } } })
    .catch(() => 0);
  const regionCount = regions.length;

  return (
    <div className="bg-white pb-16">
      <section className="bg-green/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green">
            Données ouvertes
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Filières Agricoles de Guinée
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Découvrez les principales filières du pays, leurs productions et les acteurs qui les dynamisent.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="-mt-10 rounded-3xl border border-gray-border bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="grid flex-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <RegionFilter regions={regions.map((region) => ({ id: region.id, name: region.name }))} />
              <ProductFilter products={productOptions.map((item) => item.product)} />
              <TypeFilter options={filiereTypes} placeholder="Tous les types" />
              <SearchInput placeholder="Rechercher…" />
            </div>
            {user?.role === 'admin' && <ExportButton href="/api/filieres?format=csv" />}
          </div>

          <div className="mt-8">
            <Table>
              <THead>
                <TR>
                  <TH>Région</TH>
                  <TH>Produit</TH>
                  <TH>Type</TH>
                  <TH>Volume estimé</TH>
                  <TH>Acteur principal</TH>
                  <TH>Contact</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {items.length > 0 ? (
                  items.map((filiere) => (
                    <TR key={filiere.id}>
                      <TD>{filiere.region?.name ?? '—'}</TD>
                      <TD className="font-semibold text-gray-900">{filiere.product}</TD>
                      <TD>
                        <Badge variant="success">
                          {filiere.type === 'PRODUCTION' && 'Production'}
                          {filiere.type === 'TRANSFORMATION' && 'Transformation'}
                          {filiere.type === 'EXPORT' && 'Export'}
                          {filiere.type === 'INNOVATION' && 'Innovation'}
                        </Badge>
                      </TD>
                    <TD>{formatNumber(Number(filiere.volumeTons ?? 0))} T</TD>
                      <TD>{filiere.mainActor?.name ?? '—'}</TD>
                      <TD>{filiere.contact ?? '—'}</TD>
                      <TD className="text-right">
                        <Button variant="ghost" size="sm" className="text-green">
                          Voir les détails
                        </Button>
                      </TD>
                    </TR>
                  ))
                ) : (
                  <TR>
                    <TD colSpan={7} className="py-8 text-center text-sm text-gray-500">
                      Aucune filière ne correspond à vos filtres.
                    </TD>
                  </TR>
                )}
              </TBody>
            </Table>
            <DataTablePagination total={total} pageSize={pageSize} />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-green">Total Production</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {formatNumber(Number(kpiCounts._sum.productionTons ?? 0))} T
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Volumes cumulés sur l’année courante
            </p>
          </div>
          <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-green">Transformation</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {formatNumber(Number(kpiCounts._sum.transformationTons ?? 0))} T
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Capacité des unités de transformation
            </p>
          </div>
          <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-green">Acteurs actifs</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {formatNumber(activeActors)}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Coopératives et entreprises en activité
            </p>
          </div>
          <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-green">Régions</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">{regionCount}</p>
            <p className="mt-2 text-sm text-gray-600">
              Répartition géographique des filières
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
