import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (user?.role !== 'admin') {
    redirect('/');
  }

  const [actors, filieres, projects] = await Promise.all([
    prisma.actor.findMany({ include: { region: true }, orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.filiere.findMany({ include: { region: true }, orderBy: { createdAt: 'desc' }, take: 10 }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 10 })
  ]);

  return (
    <div className="bg-white pb-20">
      <section className="bg-green/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Tableau de bord Admin
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Gérez les acteurs, filières et projets. Importez des données et suivez les dernières mises à jour.
          </p>
        </div>
      </section>
      <section className="mx-auto -mt-10 max-w-6xl px-6">
        <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-lg">
          <Tabs defaultValue="actors" className="w-full">
            <TabsList>
              <TabsTrigger value="actors">Acteurs</TabsTrigger>
              <TabsTrigger value="filieres">Filières</TabsTrigger>
              <TabsTrigger value="projects">Projets</TabsTrigger>
            </TabsList>
            <TabsContent value="actors">
              <div className="flex justify-end pb-4">
                <Button asChild>
                  <Link href="/samples/actors.csv" download>
                    Importer CSV
                  </Link>
                </Button>
              </div>
              <Table>
                <THead>
                  <TR>
                    <TH>Nom</TH>
                    <TH>Type</TH>
                    <TH>Région</TH>
                    <TH>Statut</TH>
                  </TR>
                </THead>
                <TBody>
                  {actors.map((actor) => (
                    <TR key={actor.id}>
                      <TD>{actor.name}</TD>
                      <TD>{actor.type}</TD>
                      <TD>{actor.region?.name ?? '—'}</TD>
                      <TD>{actor.status ?? '—'}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TabsContent>
            <TabsContent value="filieres">
              <div className="flex justify-end pb-4">
                <Button asChild>
                  <Link href="/samples/filieres.csv" download>
                    Importer CSV
                  </Link>
                </Button>
              </div>
              <Table>
                <THead>
                  <TR>
                    <TH>Nom</TH>
                    <TH>Produit</TH>
                    <TH>Région</TH>
                    <TH>Type</TH>
                  </TR>
                </THead>
                <TBody>
                  {filieres.map((filiere) => (
                    <TR key={filiere.id}>
                      <TD>{filiere.name}</TD>
                      <TD>{filiere.product}</TD>
                      <TD>{filiere.region?.name ?? '—'}</TD>
                      <TD>{filiere.type}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TabsContent>
            <TabsContent value="projects">
              <div className="flex justify-end pb-4">
                <Button asChild>
                  <Link href="/samples/projects.csv" download>
                    Importer CSV
                  </Link>
                </Button>
              </div>
              <Table>
                <THead>
                  <TR>
                    <TH>Titre</TH>
                    <TH>Type</TH>
                    <TH>Statut</TH>
                    <TH>Budget</TH>
                  </TR>
                </THead>
                <TBody>
                  {projects.map((project) => (
                    <TR key={project.id}>
                      <TD>{project.title}</TD>
                      <TD>{project.kind}</TD>
                      <TD>{project.status}</TD>
                      <TD>
                        {project.budgetUSD
                          ? formatCurrency(project.budgetUSD)
                          : '—'}
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
