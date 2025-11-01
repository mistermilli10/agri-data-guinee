import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { BadgeFilters } from '@/components/filters/badge-filter';
import { SearchInput } from '@/components/filters/search-input';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { SubmissionForm } from '@/components/forms/SubmissionForm';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Innovations & Projets Agricoles',
  description: 'Explorez les initiatives publiques et privées qui transforment l’agriculture guinéenne.'
};

const kindFilters = [
  { value: 'all', label: 'Tous' },
  { value: 'GOVT', label: 'Projets gouvernementaux' },
  { value: 'PRIVATE', label: 'Innovations privées' },
  { value: 'STARTUP', label: 'Startups' },
  { value: 'RESEARCH', label: 'Recherche' }
];

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const kind = typeof searchParams.kind === 'string' ? searchParams.kind : undefined;
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  const where = {
    ...(kind && kind !== 'all' ? { kind } : {}),
    ...(q
      ? {
          title: {
            contains: q,
            mode: 'insensitive'
          }
        }
      : {})
  };

  const [projects, stats] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.project.groupBy({
      by: ['status', 'kind'],
      _count: { _all: true }
    })
  ]);

  const activeProjects = stats
    .filter((item) => item.status === 'ACTIVE')
    .reduce((sum, item) => sum + item._count._all, 0);
  const innovationCount = stats
    .filter((item) => item.kind === 'PRIVATE' || item.kind === 'STARTUP')
    .reduce((sum, item) => sum + item._count._all, 0);

  const govtProjects = projects.filter((project) => project.kind === 'GOVT');
  const startupProjects = projects.filter((project) => project.kind === 'STARTUP' || project.kind === 'PRIVATE');
  const researchProjects = projects.filter((project) => project.kind === 'RESEARCH');

  return (
    <div className="bg-white pb-20">
      <section className="bg-green/10 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Innovations & Projets Agricoles
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600">
            Explorez les initiatives publiques, privées et citoyennes qui renforcent la résilience du secteur agricole.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="/auth/login">+ Soumettre un projet</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#">Rapport annuel</a>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
              <p className="text-sm font-semibold text-green">Projets actifs</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">{formatNumber(activeProjects)}</p>
            </div>
            <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
              <p className="text-sm font-semibold text-green">Innovations tech</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">{formatNumber(innovationCount)}</p>
            </div>
            <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
              <p className="text-sm font-semibold text-green">Startups</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">{formatNumber(stats.find((item) => item.kind === 'STARTUP')?._count._all ?? 0)}</p>
            </div>
            <div className="rounded-2xl border border-gray-border bg-white p-6 shadow-md">
              <p className="text-sm font-semibold text-green">Bénéficiaires</p>
              <p className="mt-3 text-3xl font-bold text-gray-900">12 500</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-6xl px-6">
        <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <BadgeFilters options={kindFilters} />
            <SearchInput placeholder="Rechercher…" />
          </div>

          <div className="mt-12 space-y-12">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Projets Gouvernementaux</h2>
                <span className="text-sm text-gray-500">
                  {govtProjects.length} initiatives
                </span>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {govtProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Startups & Innovations Privées</h2>
                <span className="text-sm text-gray-500">
                  {startupProjects.length} projets
                </span>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                {startupProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recherche & Innovation</h2>
              <div className="mt-6 space-y-4">
                {researchProjects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-2xl border border-gray-border bg-white p-6 shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {project.title}
                      </h3>
                     <span className="text-sm font-semibold text-green">
                        {project.status === 'PLANNED' && 'Planifié'}
                        {project.status === 'ACTIVE' && 'En cours'}
                        {project.status === 'COMPLETED' && 'Terminé'}
                      </span>
                    </div>
                    {project.summary && (
                      <p className="mt-3 text-sm text-gray-600">{project.summary}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl bg-green/10 p-10">
            <h3 className="text-2xl font-bold text-gray-900">Soumettre votre innovation</h3>
            <p className="mt-3 text-sm text-gray-600">
              Partagez votre projet et rejoignez la communauté AgriData Guinée pour accroître votre visibilité.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-border bg-white p-8 shadow-lg">
            <SubmissionForm />
          </div>
        </div>
      </section>
    </div>
  );
}
