import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../../config/appConfig'
import { orderService } from '../services/orderService'
import toast from 'react-hot-toast'

export function useOrders(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.orders, userId],
    queryFn: () => orderService.getUserOrders(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.order, orderId],
    queryFn: () => orderService.getOrder(orderId),
    enabled: !!orderId,
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (orderId: string) => orderService.cancelOrder(orderId),
    onSuccess: (success, orderId) => {
      if (success) {
        toast.success('ትዕዛዝ ተሰርዟል')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.orders] })
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.order, orderId] })
      } else {
        toast.error('ትዕዛዝ መሰረዝ አልተሳካም')
      }
    },
    onError: () => {
      toast.error('ትዕዛዝ መሰረዝ አልተሳካም')
    },
  })
}