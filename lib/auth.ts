import { cookies } from 'next/headers';
import { prisma } from '@/lib/db';

export type AppUser = {
  id: string;
  email: string;
  role: 'admin' | 'user';
} | null;

export async function getCurrentUser(): Promise<AppUser> {
  try {
    const cookie = cookies().get('agridata-user');
    if (!cookie) return null;
    const user = await prisma.user.findUnique({
      where: { id: cookie.value }
    });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      role: (user.role as 'admin' | 'user') ?? 'user'
    };
  } catch (error) {
    return null;
  }
}
