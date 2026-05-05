import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../../config/appConfig'
import { categoryService } from '../services/categoryService'

export function useCategories() {
  return useQuery({
    queryKey: [QUERY_KEYS.categories],
    queryFn: () => categoryService.getCategories(),
    staleTime: 10 * 60 * 1000 // 10 minutes
  })
}

export function useCategory(categoryId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.categories, categoryId],
    queryFn: () => categoryService.getCategory(categoryId),
    enabled: !!categoryId
  })
}