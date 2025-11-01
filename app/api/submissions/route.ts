import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { submissionSchema } from '@/lib/validators';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }

  const json = await request.json();
  const validation = submissionSchema.safeParse(json);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.message }, { status: 400 });
  }

  const submission = await prisma.submission.create({
    data: {
      ...validation.data,
      createdBy: user.id
    }
  });

  return NextResponse.json(submission, { status: 201 });
}
