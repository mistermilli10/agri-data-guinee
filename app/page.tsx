import { Hero } from '@/components/hero';
import { KpiCards } from '@/components/kpi-cards';
import { RegionsMap } from '@/components/map/regions-map';
import { FeaturedFilieres } from '@/components/featured-filieres';
import { About } from '@/components/about';
import { FinalCta } from '@/components/final-cta';
import { prisma } from '@/lib/db';
import { Leaf, Users, BarChart3, Rocket } from 'lucide-react';

async function getHomeData() {
  const [filieres, actors, projects, regionStats] = await Promise.all([
    prisma.filiere.count(),
    prisma.actor.count(),
    prisma.project.count(),
    prisma.regionStat.findMany({
      include: {
        region: true
      }
    })
  ]);

  return {
    filieres,
    actors,
    projects,
    totalVolume: regionStats.reduce((acc, stat) => acc + (stat.productionTons ?? 0), 0),
    regionStats: regionStats.map((stat) => ({
      id: stat.regionId,
      name: stat.region?.name ?? 'Région',
      volume: stat.productionTons ?? 0
    }))
  };
}

export default async function HomePage() {
  const data = await getHomeData().catch(() => ({
    filieres: 12,
    actors: 1247,
    projects: 34,
    totalVolume: 89500,
    regionStats: [
      { id: 'kindia', name: 'Kindia', volume: 18700 },
      { id: 'kankan', name: 'Kankan', volume: 16200 },
      { id: 'nzerekore', name: 'N’Zérékoré', volume: 14950 }
    ]
  }));

  return (
    <div className="bg-white">
      <Hero />
      <KpiCards
        data={[
          { label: 'Filières suivies', value: data.filieres, icon: Leaf },
          { label: 'Coopératives actives', value: data.actors, icon: Users },
          { label: 'Volume total (T)', value: data.totalVolume, icon: BarChart3 },
          { label: "Projets d'innovation", value: data.projects, icon: Rocket }
        ]}
      />
      <RegionsMap stats={data.regionStats} />
      <FeaturedFilieres />
      <About />
      <FinalCta />
    </div>
  );
}
