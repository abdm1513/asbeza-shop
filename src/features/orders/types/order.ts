import { AppwriteDocument } from '../../../types'

export type OrderType = 'delivery' | 'pickup'
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled'
export type PaymentMethod = 'cod'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  unit: string
}

export interface Order extends AppwriteDocument {
  orderId: string
  userId: string
  userName: string
  userPhone: string
  items: OrderItem[]
  subTotal: number
  deliveryFee: number
  total: number
  orderStatus: OrderStatus
  orderType: OrderType
  deliveryAddress: string
  paymentMethod: PaymentMethod
  deliveryTime: 'asap' | 'scheduled'
  scheduledTime?: string
  notes?: string
}

export interface CreateOrderInput {
  userId: string
  userName: string
  userPhone: string
  items: OrderItem[]
  subTotal: number
  deliveryFee: number
  total: number
  orderType: OrderType
  deliveryAddress: string
  deliveryTime: 'asap' | 'scheduled'
  scheduledTime?: string
  notes?: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'በመጠባበቅ ላይ',
  confirmed: 'ተረጋግጧል',
  preparing: 'እየተዘጋጀ ነው',
  'out-for-delivery': 'ለማድረስ ወጥቷል',
  delivered: 'ደርሷል',
  cancelled: 'ተሰርዟል',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  'out-for-delivery': 'bg-orange-100 text-orange-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export const ORDER_TYPE_LABELS: Record<OrderType, string> = {
  delivery: 'ማድረስ',
  pickup: 'አንሳ',
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

export function mapDocumentToOrder(doc: Record<string, unknown>): Order {
  const items = (() => {
    const itemsData = doc.items
    if (!itemsData) return []
    if (Array.isArray(itemsData)) return itemsData as OrderItem[]
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
    orderId: String(doc.orderId || ''),
    userId: String(doc.userId || ''),
    userName: String(doc.userName || ''),
    userPhone: String(doc.userPhone || ''),
    items: items,
    subTotal: Number(doc.subTotal) || 0,
    deliveryFee: Number(doc.deliveryFee) || 0,
    total: Number(doc.total) || 0,
    orderStatus: (doc.orderStatus as OrderStatus) || 'pending',
    orderType: (doc.orderType as OrderType) || 'delivery',
    deliveryAddress: String(doc.deliveryAddress || ''),
    paymentMethod: (doc.paymentMethod as PaymentMethod) || 'cod',
    deliveryTime: (doc.deliveryTime as 'asap' | 'scheduled') || 'asap',
    scheduledTime: doc.scheduledTime ? String(doc.scheduledTime) : undefined,
    notes: doc.notes ? String(doc.notes) : undefined,
  }
}