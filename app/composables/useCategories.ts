export interface Category {
  id: number
  nome: string
}

export const useCategories = async () => {
  return await useFetch<Category[]>('https://dummyjson.com/c/a85a-af81-4423-9dd2')
}
