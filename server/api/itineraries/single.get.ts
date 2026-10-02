import {defineEventHandler} from 'h3';
import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const SUPABASE_URL = config.public?.supabaseUrl;
  const SERVICE_ROLE = config.supabaseServiceRoleKey;
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return {
      success: false,
      error: 'Missing Supabase server key in runtime config',
    };
  }

  const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false }
  });

  const query = getQuery(event)
  const {data, error} = await supabaseAdmin.from('itineraries_json').select('*').eq('itinerary_json_id', query.id).single();

  if (error) {
    return {success: false, error};
  }

  return data;
});
