import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;


export const getTweets = async () => {
    if (!supabaseUrl || !supabaseSecretKey) return;

    const supabaseServer = new SupabaseClient(supabaseUrl, supabaseSecretKey);

    const response = await supabaseServer.from('tweets').select(`
        *,
        profiles (
            full_name,
            username
        )
    `)
        .order('created_at', {
            ascending: false
        })
        .returns<(Database['public']['Tables']['tweets']['Row'] & {
            profiles: Pick<
                Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'
            >
        })[]>();

    return response;
}