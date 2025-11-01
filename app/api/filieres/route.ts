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
  const regionId = searchParams.get('regionId') ?? undefined;
  const type = searchParams.get('type') ?? undefined;
  const q = searchParams.get('q') ?? undefined;
  const product = searchParams.get('product') ?? undefined;
  const format = searchParams.get('format');

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

  const [items, total] = await Promise.all([
    prisma.filiere.findMany({
      where,
      include: { region: true, mainActor: true },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.filiere.count({ where })
  ]);

  if (format === 'csv') {
    const exportItems = await prisma.filiere.findMany({
      where,
      include: { region: true, mainActor: true }
    });
    const headers = ['region', 'produit', 'type', 'volumeTons', 'acteur', 'contact'];
    const rows = exportItems.map((item) => [
      item.region?.name ?? '',
      item.product,
      item.type,
      item.volumeTons ?? '',
      item.mainActor?.name ?? '',
      item.contact ?? ''
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="filieres.csv"'
      }
    });
  }

  return NextResponse.json({ items, total, page, pageSize });
}
