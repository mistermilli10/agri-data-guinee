import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import 'dotenv/config';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRole) {
  console.error('Supabase credentials are missing.');
  process.exit(1);
}

async function main() {
  const sql = readFileSync('supabase/policies.sql', 'utf8');
  const supabase = createClient(url, serviceRole, {
    auth: { persistSession: false }
  });
  const { error } = await supabase.rpc('exec_sql', { sql });
  if (error) {
    console.error('Failed to apply policies', error);
    process.exit(1);
  }
  console.log('Policies applied successfully.');
}

main();
