export interface Category {
  category_id: number
  key: string
}

export async function useCategories() {
  return await $fetch<Category[]>('/api/categories/list');
}