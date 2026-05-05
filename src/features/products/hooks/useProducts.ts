import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../../config/appConfig'
import { productService } from '../services/productService'
import { ProductFilters } from '../types/product'

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: [QUERY_KEYS.products, JSON.stringify(filters)],
    queryFn: () => productService.getProducts(filters, 20, 0),
    enabled: filters?.search ? filters.search.trim().length > 0 : true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    throwOnError: false,
  })
}

export function useInfiniteProducts(filters?: ProductFilters) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.products, 'infinite', filters],
    queryFn: ({ pageParam = 0 }) => productService.getProducts(filters, 20, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce((sum, page) => sum + page.data.length, 0)
      if (loadedItems < lastPage.total) {
        return loadedItems
      }
      return undefined
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    throwOnError: false,
  })
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.product, productId],
    queryFn: () => productService.getProduct(productId),
    enabled: !!productId,
    retry: 1,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: [QUERY_KEYS.products, 'featured'],
    queryFn: () => productService.getFeaturedProducts(10),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function useProductsByCategory(categoryId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.products, 'category', categoryId],
    queryFn: () => productService.getProductsByCategory(categoryId, 20),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  })
}