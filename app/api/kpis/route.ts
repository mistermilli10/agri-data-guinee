import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const [filieres, actors, projects, regionStats] = await Promise.all([
    prisma.filiere.count(),
    prisma.actor.count(),
    prisma.project.count(),
    prisma.regionStat.aggregate({
      _sum: {
        productionTons: true
      }
    })
  ]);

  return NextResponse.json({
    filieres,
    actors,
    projects,
    totalVolume: Number(regionStats._sum.productionTons ?? 0)
  });
}
