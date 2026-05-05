import { useState } from 'react'
import { orderService } from '../../orders/services/orderService'
import { CreateOrderInput } from '../../orders/types/order'
import toast from 'react-hot-toast'

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false)

  const createOrder = async (orderData: CreateOrderInput): Promise<boolean> => {
    console.log('useCheckout - createOrder called with:', orderData)
    setIsLoading(true)
    try {
      const order = await orderService.createOrder(orderData)
      console.log('useCheckout - order created:', order)
      toast.success('ትዕዛዝዎ በተሳካ ሁኔታ ተልኳል!')
      return true
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('ትዕዛዝ መላክ አልተሳካም። እባክዎ ይሞክሩ')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createOrder,
    isLoading,
  }
}