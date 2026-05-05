import { Shield, Truck, Clock, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { formatCurrency } from '../../../utils/formatters'
import { APP_CONFIG } from '../../../config/appConfig'

interface CartSummaryProps {
  subtotal: number
  deliveryFee: number
  total: number
  isFreeDelivery: boolean
  needsMinimumOrder: boolean
  remainingForMinimum: number
  remainingForFreeDelivery: number
  itemCount: number
  onCheckout: () => void
  isCheckingOut?: boolean
}

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  isFreeDelivery,
  needsMinimumOrder,
  remainingForFreeDelivery,
  itemCount,
  onCheckout,
  isCheckingOut = false
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 sticky top-20">
      <h2 className="text-lg font-bold text-gray-800 mb-4">የትዕዛዝ ማጠቃለያ</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">የምርቶች ዋጋ ({itemCount} ዕቃዎች)</span>
          <span className="font-semibold">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">የማድረስ ክፍያ</span>
          {isFreeDelivery ? (
            <span className="text-green-600 font-semibold">ነጻ</span>
          ) : (
            <span className="font-semibold">{formatCurrency(deliveryFee)}</span>
          )}
        </div>
        
        {!isFreeDelivery && remainingForFreeDelivery > 0 && (
          <div className="flex items-center gap-2 text-sm text-warning bg-yellow-50 p-2 rounded-lg">
            <Truck size={14} />
            <span>
              ነጻ ለማድረስ ተጨማሪ {formatCurrency(remainingForFreeDelivery)} ያስፈልጋል
            </span>
          </div>
        )}
        
        {needsMinimumOrder && (
          <div className="flex items-center gap-2 text-sm text-error bg-red-50 p-2 rounded-lg">
            <AlertCircle size={14} />
            <span>
              ዝቅተኛ ትዕዛዝ {formatCurrency(APP_CONFIG.minOrderAmount)} ነው
            </span>
          </div>
        )}
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold">
            <span>ጠቅላላ</span>
            <span className="text-primary">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <Button
        onClick={onCheckout}
        disabled={needsMinimumOrder || isCheckingOut}
        isLoading={isCheckingOut}
        fullWidth
        className="mt-5"
      >
        ትዕዛዝ አስገባ
      </Button>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={14} />
          <span>ደህንነቱ የተጠበቀ ክፍያ</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Clock size={14} />
          <span>ማድረስ 30-60 ደቂቃ</span>
        </div>
      </div>
    </div>
  )
}