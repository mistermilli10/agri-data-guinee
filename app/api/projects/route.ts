import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { filterQuerySchema } from '@/lib/validators';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const validation = filterQuerySchema.safeParse(Object.fromEntries(searchParams));
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.message }, { status: 400 });
  }

  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '10');
  const kind = searchParams.get('kind') ?? undefined;
  const status = searchParams.get('status') ?? undefined;
  const q = searchParams.get('q') ?? undefined;

  const where = {
    ...(kind ? { kind } : {}),
    ...(status ? { status } : {}),
    ...(q
      ? {
          title: { contains: q, mode: 'insensitive' }
        }
      : {})
  };

  const [items, total] = await Promise.all([
    prisma.project.findMany({ where, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.project.count({ where })
  ]);

  return NextResponse.json({ items, total, page, pageSize });
}
