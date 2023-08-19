import { randomUUID } from 'crypto'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

export const supabaseServer = new SupabaseClient<Database>(supabaseUrl as string, supabaseSecretKey as string);