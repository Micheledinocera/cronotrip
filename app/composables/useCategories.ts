export interface Category {
  category_id: number
  key: string
}

export async function useCategories() {
  const client = useSupabaseClient();
  const { data:categories } = await client.from('categories').select('*').overrideTypes<Category[], {merge: false}>();
  return categories!;
}