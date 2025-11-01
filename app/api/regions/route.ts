import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const regions = await prisma.region.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json({ items: regions });
}
