import { APP_CONFIG } from '../config/appConfig'

export const PRICING_RULES = {
  MIN_ORDER_AMOUNT: APP_CONFIG.minOrderAmount,
  DELIVERY_FEE: APP_CONFIG.deliveryFee,
  FREE_DELIVERY_THRESHOLD: APP_CONFIG.freeDeliveryThreshold
}

export interface OrderCalculation {
  subtotal: number
  deliveryFee: number
  total: number
  isFreeDelivery: boolean
  needsMinimumOrder: boolean
  remainingForMinimum: number
  remainingForFreeDelivery: number
}

export function calculateOrder(subtotal: number): OrderCalculation {
  const isFreeDelivery = subtotal >= PRICING_RULES.FREE_DELIVERY_THRESHOLD
  const deliveryFee = isFreeDelivery ? 0 : PRICING_RULES.DELIVERY_FEE
  const needsMinimumOrder = subtotal < PRICING_RULES.MIN_ORDER_AMOUNT
  
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    isFreeDelivery,
    needsMinimumOrder,
    remainingForMinimum: Math.max(0, PRICING_RULES.MIN_ORDER_AMOUNT - subtotal),
    remainingForFreeDelivery: Math.max(0, PRICING_RULES.FREE_DELIVERY_THRESHOLD - subtotal)
  }
}

export function canCheckout(subtotal: number): boolean {
  return subtotal >= PRICING_RULES.MIN_ORDER_AMOUNT
}

export function getDeliveryMessage(subtotal: number): string {
  if (subtotal >= PRICING_RULES.FREE_DELIVERY_THRESHOLD) {
    return 'ነጻ ማድረስ!'
  }
  if (subtotal >= PRICING_RULES.MIN_ORDER_AMOUNT) {
    const remaining = PRICING_RULES.FREE_DELIVERY_THRESHOLD - subtotal
    return `ነጻ ለማድረስ ተጨማሪ ${remaining} ብር ያስፈልጋል`
  }
  const remaining = PRICING_RULES.MIN_ORDER_AMOUNT - subtotal
  return `ትእዛዝ ለማስገባት ተጨማሪ ${remaining} ብር ያስፈልጋል`
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[+]?[0-9]{9,13}$/
  return phoneRegex.test(phone)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return `ORD-${timestamp}-${random}`.toUpperCase()
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) result[groupKey] = []
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export function sortByOrder<T>(items: T[], orderField: keyof T): T[] {
  return [...items].sort((a, b) => {
    const aVal = Number(a[orderField]) || 0
    const bVal = Number(b[orderField]) || 0
    return aVal - bVal
  })
}