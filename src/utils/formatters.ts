import { format as dateFnsFormat, formatDistance } from 'date-fns'

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString()} ብር`
}

export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M ብር`
  if (amount >= 1000) return `${(amount / 1000).toFixed(1)}K ብር`
  return `${amount} ብር`
}

export function formatDate(date: string | Date, format: string = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateFnsFormat(dateObj, format)
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistance(dateObj, new Date(), { addSuffix: true })
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 9) {
    return `+251${cleaned}`
  }
  if (cleaned.length === 12 && cleaned.startsWith('251')) {
    return `+${cleaned}`
  }
  return phone
}

export function formatOrderStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'በመጠባበቅ ላይ',
    confirmed: 'ተረጋግጧል',
    preparing: 'እየተዘጋጀ ነው',
    'out-for-delivery': 'ለማድረስ ወጥቷል',
    delivered: 'ደርሷል',
    cancelled: 'ተሰርዟል'
  }
  return statusMap[status] || status
}

export function formatOrderType(type: string): string {
  const typeMap: Record<string, string> = {
    delivery: 'ማድረስ',
    pickup: 'አንሳ'
  }
  return typeMap[type] || type
}

export function capitalizeAmharic(text: string): string {
  return text
}

export function formatProductUnit(unit: string, quantity: number = 1): string {
  const unitMap: Record<string, string> = {
    kg: 'ኪሎ',
    g: 'ግራም',
    L: 'ሊትር',
    ml: 'ሚሊሊትር',
    pcs: 'ቁራጭ',
    pack: 'ጥቅል'
  }
  const amharicUnit = unitMap[unit] || unit
  return `${quantity} ${amharicUnit}`
}