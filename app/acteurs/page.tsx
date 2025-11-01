import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { RegionFilter } from '@/components/filters/region-filter';
import { TypeFilter } from '@/components/filters/type-filter';
import { SearchInput } from '@/components/filters/search-input';
import { ActorCard } from '@/components/cards/ActorCard';
import { AddActorDialog } from '@/components/forms/AddActorDialog';
import { formatNumber } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Acteurs du secteur agricole',
  description: 'Découvrez les coopératives, transformateurs, startups et ONG engagés.'
};

const typeOptions = [
  { value: 'COOPERATIVE', label: 'Coopératives' },
  { value: 'TRANSFORMATEUR', label: 'Transformateurs' },
  { value: 'STARTUP', label: 'Startups' },
  { value: 'ONG', label: 'ONG' },
  { value: 'ASSOCIATION', label: 'Associations' },
  { value: 'INSTITUTION', label: 'Institutions' }
];

export default async function ActorsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const [user, regions] = await Promise.all([
    getCurrentUser(),
    prisma.region.findMany({ orderBy: { name: 'asc' } })
  ]);

  const type = typeof searchParams.type === 'string' ? searchParams.type : undefined;
  const regionId = typeof searchParams.regionId === 'string' ? searchParams.regionId : undefined;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  const where = {
    ...(type ? { type } : {}),
    ...(regionId ? { regionId } : {}),
    ...(q
      ? {
          name: {
            contains: q,
            mode: 'insensitive'
          }
        }
      : {})
  };

  const [actors, counts] = await Promise.all([
    prisma.actor.findMany({
      where,
      include: {
        region: true
      },
      orderBy: { name: 'asc' }
    }),
    prisma.actor.groupBy({
      by: ['type'],
      _count: { _all: true }
    })
  ]);

  const summary = typeOptions.map((option) => ({
    label: option.label,
    value:
      counts.find((count) => count.type === option.value)?._count._all ?? 0
  }));

  const totalActors = actors.length;

  return (
    <div className="bg-white pb-20">
      <section className="bg-green/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-green">
            Communauté
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Acteurs du Secteur Agricole
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Découvrez l’écosystème des coopératives, transformateurs, startups et organisations qui dynamisent l’agriculture.
          </p>
        </div>
      </section>

      <section className="mx-auto -mt-12 max-w-6xl px-6">
        <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-lg">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="grid gap-3 md:grid-cols-3">
              <TypeFilter options={[{ value: 'all', label: 'Tous les types' }, ...typeOptions]} placeholder="Tous les types" />
              <RegionFilter regions={regions.map((region) => ({ id: region.id, name: region.name }))} />
              <SearchInput placeholder="Rechercher…" />
            </div>
            <div className="flex items-center justify-end">
              {user?.role === 'admin' ? (
                <AddActorDialog regions={regions} />
              ) : null}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {actors.map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
            <p className="text-sm font-semibold text-green">Acteurs recensés</p>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {formatNumber(totalActors)}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Profils répondant à vos filtres
            </p>
          </div>
          {summary.slice(0, 3).map((item) => (
            <div key={item.label} className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
              <p className="text-sm font-semibold text-green">{item.label}</p>
              <p className="mt-4 text-3xl font-bold text-gray-900">
                {formatNumber(item.value)}
              </p>
              <p className="mt-2 text-sm text-gray-600">Acteurs identifiés</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
