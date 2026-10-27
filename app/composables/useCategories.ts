export interface Category {
  category_id: number
  key: string
}

export async function useCategories() {
  const supabase = useSupabaseClient();
  const {data, error} = await supabase.from('categories').select('*');
  if (error) throw error;
  return data as Category[];
}
