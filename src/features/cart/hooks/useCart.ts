// import { useCallback, useMemo } from 'react'
// import { useCartStore } from '../store/cartStore'
// import { CartItem } from '../types/cart'
// import { calculateOrder, canCheckout, getDeliveryMessage } from '../../../utils/helpers'

// export function useCart() {
//   const { items, totalItems, totalPrice, isLoading, error, addItem, removeItem, updateQuantity, clearCart } = useCartStore()

//   const orderCalculation = useMemo(() => calculateOrder(totalPrice), [totalPrice])
//   const canCheckoutFlag = useMemo(() => canCheckout(totalPrice), [totalPrice])
//   const deliveryMessage = useMemo(() => getDeliveryMessage(totalPrice), [totalPrice])

//   const getItemQuantity = useCallback((productId: string) => {
//     const item = items.find(i => i.productId === productId)
//     return item?.quantity || 0
//   }, [items])

//   const getTotalForItem = useCallback((productId: string) => {
//     const item = items.find(i => i.productId === productId)
//     return item ? item.price * item.quantity : 0
//   }, [items])

//   const isInCart = useCallback((productId: string) => {
//     return items.some(i => i.productId === productId)
//   }, [items])

//   return {
//     items,
//     totalItems,
//     totalPrice,
//     isLoading,
//     error,
//     orderCalculation,
//     canCheckout: canCheckoutFlag,
//     deliveryMessage,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     getItemQuantity,
//     getTotalForItem,
//     isInCart,
//   }
// }

// import { useCallback, useMemo } from 'react'
// import { useCartStore } from '../store/cartStore'
// import { calculateOrder, canCheckout, getDeliveryMessage } from '../../../utils/helpers'

// export function useCart() {
//   const { items, totalItems, totalPrice, isLoading, error, addItem, removeItem, updateQuantity, clearCart } = useCartStore()

//   // itemCount is number of unique items, not total quantity
//   const itemCount = items.length
  
//   const orderCalculation = useMemo(() => calculateOrder(totalPrice), [totalPrice])
//   const canCheckoutFlag = useMemo(() => canCheckout(totalPrice), [totalPrice])
//   const deliveryMessage = useMemo(() => getDeliveryMessage(totalPrice), [totalPrice])

//   const getItemQuantity = useCallback((productId: string) => {
//     const item = items.find(i => i.productId === productId)
//     return item?.quantity || 0
//   }, [items])

//   const getTotalForItem = useCallback((productId: string) => {
//     const item = items.find(i => i.productId === productId)
//     return item ? item.price * item.quantity : 0
//   }, [items])

//   const isInCart = useCallback((productId: string) => {
//     return items.some(i => i.productId === productId)
//   }, [items])

//   return {
//     items,
//     totalItems, // This is total quantity sum (for display in cart)
//     itemCount, // This is unique items count (for badge)
//     totalPrice,
//     isLoading,
//     error,
//     orderCalculation,
//     canCheckout: canCheckoutFlag,
//     deliveryMessage,
//     addItem,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     getItemQuantity,
//     getTotalForItem,
//     isInCart,
//   }
// }

import { useCallback, useMemo } from 'react'
import { useCartStore } from '../store/cartStore'
import { calculateOrder, canCheckout, getDeliveryMessage } from '../../../utils/helpers'

export function useCart() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    isLoading, 
    error, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart,
    deliveryMethod,
    setDeliveryMethod
  } = useCartStore()

  const itemCount = items.length
  
  const orderCalculation = useMemo(() => calculateOrder(totalPrice), [totalPrice])
  const canCheckoutFlag = useMemo(() => canCheckout(totalPrice), [totalPrice])
  const deliveryMessage = useMemo(() => getDeliveryMessage(totalPrice), [totalPrice])

  const getItemQuantity = useCallback((productId: string) => {
    const item = items.find(i => i.productId === productId)
    return item?.quantity || 0
  }, [items])

  const getTotalForItem = useCallback((productId: string) => {
    const item = items.find(i => i.productId === productId)
    return item ? item.price * item.quantity : 0
  }, [items])

  const isInCart = useCallback((productId: string) => {
    return items.some(i => i.productId === productId)
  }, [items])

  return {
    items,
    totalItems,
    itemCount,
    totalPrice,
    isLoading,
    error,
    orderCalculation,
    canCheckout: canCheckoutFlag,
    deliveryMessage,
    deliveryMethod,
    setDeliveryMethod,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    getTotalForItem,
    isInCart,
  }
}