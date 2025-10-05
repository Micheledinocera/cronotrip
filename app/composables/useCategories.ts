export interface Category {
  id: number
  key: string
}

export const useCategories = async () => {
  return await useFetch<Category[]>('https://dummyjson.com/c/029b-e806-4ee9-8ad1')
}