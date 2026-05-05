import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../../config/appConfig'
import { bannerService } from '../services/bannerService'

export function useBanners() {
  return useQuery({
    queryKey: [QUERY_KEYS.banners],
    queryFn: () => bannerService.getActiveBanners(),
    staleTime: 5 * 60 * 1000,
  })
}