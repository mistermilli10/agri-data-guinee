import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { actorCreateSchema, filterQuerySchema } from '@/lib/validators';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validation = filterQuerySchema.safeParse(Object.fromEntries(searchParams));
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.message }, { status: 400 });
  }

  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '12');
  const regionId = searchParams.get('regionId') ?? undefined;
  const type = searchParams.get('type') ?? undefined;
  const q = searchParams.get('q') ?? undefined;

  const where = {
    ...(regionId ? { regionId } : {}),
    ...(type ? { type } : {}),
    ...(q
      ? {
          name: {
            contains: q,
            mode: 'insensitive'
          }
        }
      : {})
  };

  const [items, total] = await Promise.all([
    prisma.actor.findMany({
      where,
      include: { region: true },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.actor.count({ where })
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (user?.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const json = await request.json();
  const validation = actorCreateSchema.safeParse(json);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.message }, { status: 400 });
  }

  const actor = await prisma.actor.create({
    data: validation.data
  });

  return NextResponse.json(actor, { status: 201 });
}
