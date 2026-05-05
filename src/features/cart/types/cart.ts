// import { AppwriteDocument } from '../../../types'

// export interface CartItem {
//   productId: string
//   name: string
//   price: number
//   quantity: number
//   image: string
//   unit: string
// }

// export interface Cart extends AppwriteDocument {
//   userId: string
//   items: CartItem[]
//   totalPrice: number
//   totalItems: number
// }

// export interface CartStoreState {
//   items: CartItem[]
//   totalItems: number
//   totalPrice: number
//   isLoading: boolean
//   error: string | null
//   cartId: string | null
//   isHydrated: boolean
// }

// export interface CartStoreActions {
//   setItems: (items: CartItem[]) => void
//   addItem: (item: CartItem, merge?: boolean) => void
//   removeItem: (productId: string) => void
//   updateQuantity: (productId: string, quantity: number) => void
//   clearCart: () => void
//   setLoading: (isLoading: boolean) => void
//   setError: (error: string | null) => void
//   setCartId: (cartId: string | null) => void
//   setHydrated: (hydrated: boolean) => void
// }

// export type CartStore = CartStoreState & CartStoreActions

// export function mapDocumentToCart(doc: Record<string, unknown>): Cart {
//   const items = (() => {
//     const itemsData = doc.items
//     if (!itemsData) return []
//     if (Array.isArray(itemsData)) return itemsData as CartItem[]
//     try {
//       return JSON.parse(itemsData as string)
//     } catch {
//       return []
//     }
//   })()

//   return {
//     $id: String(doc.$id || ''),
//     $createdAt: String(doc.$createdAt || ''),
//     $updatedAt: String(doc.$updatedAt || ''),
//     userId: String(doc.userId || ''),
//     items: Array.isArray(items) ? items : [],
//     totalPrice: Number(doc.totalPrice) || 0,
//     totalItems: Number(doc.totalItems) || 0,
//   }
// }

// export function productToCartItem(product: any, quantity: number = 1): CartItem {
//   return {
//     productId: product.$id,
//     name: product.name,
//     price: product.price,
//     quantity,
//     image: product.images?.[0] || '',
//     unit: product.unit,
//   }
// }

import { AppwriteDocument } from '../../../types'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  unit: string
}

export interface Cart extends AppwriteDocument {
  userId: string
  items: CartItem[]
  totalPrice: number
  totalItems: number
}

export interface CartStoreState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isLoading: boolean
  error: string | null
  cartId: string | null
  isHydrated: boolean
  deliveryMethod: 'delivery' | 'pickup'  // Add delivery method to store
}

export interface CartStoreActions {
  setItems: (items: CartItem[]) => void
  addItem: (item: CartItem, merge?: boolean) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setCartId: (cartId: string | null) => void
  setHydrated: (hydrated: boolean) => void
  setDeliveryMethod: (method: 'delivery' | 'pickup') => void  // Add setter
}

export type CartStore = CartStoreState & CartStoreActions

export function mapDocumentToCart(doc: Record<string, unknown>): Cart {
  const items = (() => {
    const itemsData = doc.items
    if (!itemsData) return []
    if (Array.isArray(itemsData)) return itemsData as CartItem[]
    try {
      return JSON.parse(itemsData as string)
    } catch {
      return []
    }
  })()

  return {
    $id: String(doc.$id || ''),
    $createdAt: String(doc.$createdAt || ''),
    $updatedAt: String(doc.$updatedAt || ''),
    userId: String(doc.userId || ''),
    items: Array.isArray(items) ? items : [],
    totalPrice: Number(doc.totalPrice) || 0,
    totalItems: Number(doc.totalItems) || 0,
  }
}

export function productToCartItem(product: any, quantity: number = 1): CartItem {
  return {
    productId: product.$id,
    name: product.name,
    price: product.price,
    quantity,
    image: product.images?.[0] || '',
    unit: product.unit,
  }
}