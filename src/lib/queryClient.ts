import { QueryClient } from '@tanstack/react-query'
import { API_CONFIG } from '../config/appConfig'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: API_CONFIG.retryCount,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, API_CONFIG.retryDelay),
      staleTime: API_CONFIG.staleTime,
      gcTime: API_CONFIG.cacheTime,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 500,
    },
  },
})

// Helper to invalidate multiple queries
export const invalidateQueries = async (keys: string[]) => {
  await Promise.all(keys.map(key => queryClient.invalidateQueries({ queryKey: [key] })))
}

// Helper to prefetch data - FIXED
export const prefetchQuery = async <T>(
  key: string[],
  fetcher: () => Promise<T>
): Promise<void> => {
  await queryClient.prefetchQuery({
    queryKey: key,
    queryFn: fetcher,
  })
}