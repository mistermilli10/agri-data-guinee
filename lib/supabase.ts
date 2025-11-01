import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

export const createClient = () =>
  createRouteHandlerClient<Database>({
    cookies
  });
