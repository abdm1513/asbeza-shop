import { formatCurrency } from '../../../utils/formatters'
import { CartItem } from '../../cart/types/cart'
import { OptimizedImage } from '../../../components/common/OptimizedImage'

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  isFreeDelivery: boolean
}

export function OrderSummary({ items, subtotal, deliveryFee, total, isFreeDelivery }: OrderSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">የትዕዛዝ ማጠቃለያ</h3>
      
      {/* Items */}
      <div className="space-y-3 bg-white rounded-xl shadow-sm border border-gray-300 p-6 mb-4">
        {items.map((item) => (
          <div key={item.productId} className="flex gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <OptimizedImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm line-clamp-2">{item.name}</div>
              <div className="text-xs text-gray-500">{item.quantity} x {formatCurrency(item.price)}</div>
            </div>
            <div className="font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>
      
      {/* Totals */}
      <div className="border-t pt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">ንዑስ ድምር</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">የማድረስ ክፍያ</span>
          <span>{isFreeDelivery ? 'ነጻ' : formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>ጠቅላላ</span>
          <span className="text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}