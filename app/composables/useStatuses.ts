export interface ItineraryStatus {
  key: string
  position: number
}

export async function useStatuses() {
  const supabase = useSupabaseClient();
  const {data, error} = await supabase.from('itinerary_statuses').select('*').order('position');
  if (error) throw error;
  return data as ItineraryStatus[];
}
