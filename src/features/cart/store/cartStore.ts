// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { CartStore, CartItem } from '../types/cart'

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       totalItems: 0,
//       totalPrice: 0,
//       isLoading: false,
//       error: null,
//       cartId: null,
//       isHydrated: false,

//       setItems: (items) => {
//         const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
//         const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       },

//       addItem: (item, merge = true) => {
//         const items = get().items
//         const existingIndex = items.findIndex(i => i.productId === item.productId)
        
//         let newItems: CartItem[]
//         if (existingIndex >= 0 && merge) {
//           newItems = [...items]
//           newItems[existingIndex] = {
//             ...newItems[existingIndex],
//             quantity: item.quantity
//           }
//         } else if (existingIndex >= 0 && !merge) {
//           return
//         } else {
//           newItems = [...items, item]
//         }
        
//         const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items: newItems, totalItems, totalPrice })
//       },

//       removeItem: (productId) => {
//         const items = get().items.filter(i => i.productId !== productId)
//         const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       },

//       // updateQuantity: (productId, quantity) => {
//       //   const items = get().items.map(item =>
//       //     item.productId === productId ? { ...item, quantity } : item
//       //   ).filter(item => item.quantity > 0)
        
//       //   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//       //   const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//       //   set({ items, totalItems, totalPrice })
//       // },
      
//       updateQuantity: (productId, quantity) => {
//       if (quantity <= 0) {
//         // Remove item completely when quantity is 0
//         const items = get().items.filter(i => i.productId !== productId)
//         const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       } else {
//         // Update quantity
//         const items = get().items.map(item =>
//           item.productId === productId ? { ...item, quantity } : item
//         )
//         const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       }
//     },

//       clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

//       setLoading: (isLoading) => set({ isLoading }),
//       setError: (error) => set({ error }),
//       setCartId: (cartId) => set({ cartId }),
//       setHydrated: (isHydrated) => set({ isHydrated }),
//     }),
//     {
//       name: 'cart-storage',
//       onRehydrateStorage: () => (state) => {
//         state?.setHydrated(true)
//       },
//     }
//   )
// )

// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { CartStore, CartItem } from '../types/cart'

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       items: [],
//       totalItems: 0,
//       totalPrice: 0,
//       isLoading: false,
//       error: null,
//       cartId: null,
//       isHydrated: false,

//       setItems: (items) => {
//         const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
//         const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       },

//       addItem: (item, merge = true) => {
//         const items = get().items
//         const existingIndex = items.findIndex(i => i.productId === item.productId)
        
//         let newItems: CartItem[]
//         if (existingIndex >= 0 && merge) {
//           newItems = [...items]
//           newItems[existingIndex] = {
//             ...newItems[existingIndex],
//             quantity: item.quantity
//           }
//         } else if (existingIndex >= 0 && !merge) {
//           return
//         } else {
//           newItems = [...items, item]
//         }
        
//         const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items: newItems, totalItems, totalPrice })
//       },

//       removeItem: (productId) => {
//         const items = get().items.filter(i => i.productId !== productId)
//         const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       },

//       updateQuantity: (productId, quantity) => {
//         const items = get().items.map(item =>
//           item.productId === productId ? { ...item, quantity } : item
//         ).filter(item => item.quantity > 0)
        
//         const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
//         const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
//         set({ items, totalItems, totalPrice })
//       },

//       clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),

//       setLoading: (isLoading) => set({ isLoading }),
//       setError: (error) => set({ error }),
//       setCartId: (cartId) => set({ cartId }),
//       setHydrated: (isHydrated) => set({ isHydrated }),
//     }),
//     {
//       name: 'cart-storage',
//       onRehydrateStorage: () => (state) => {
//         state?.setHydrated(true)
//       },
//     }
//   )
// )

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartStore, CartItem } from '../types/cart'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      isLoading: false,
      error: null,
      cartId: null,
      isHydrated: false,
      deliveryMethod: 'delivery', // Default to delivery

      setItems: (items) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        set({ items, totalItems, totalPrice })
      },

      addItem: (item, merge = true) => {
        const items = get().items
        const existingIndex = items.findIndex(i => i.productId === item.productId)
        
        let newItems: CartItem[]
        if (existingIndex >= 0 && merge) {
          newItems = [...items]
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: item.quantity
          }
        } else if (existingIndex >= 0 && !merge) {
          return
        } else {
          newItems = [...items, item]
        }
        
        const totalItems = newItems.reduce((sum, i) => sum + i.quantity, 0)
        const totalPrice = newItems.reduce((sum, i) => sum + (i.price * i.quantity), 0)
        set({ items: newItems, totalItems, totalPrice })
      },

      removeItem: (productId) => {
        const items = get().items.filter(i => i.productId !== productId)
        const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
        const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
        set({ items, totalItems, totalPrice })
      },

      updateQuantity: (productId, quantity) => {
        const items = get().items.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0)
        
        const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
        const totalPrice = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
        set({ items, totalItems, totalPrice })
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0, deliveryMethod: 'delivery' }),

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setCartId: (cartId) => set({ cartId }),
      setHydrated: (isHydrated) => set({ isHydrated }),
      setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)