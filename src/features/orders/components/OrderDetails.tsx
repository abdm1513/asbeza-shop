import { Calendar, MapPin, Truck, Phone, User, Clock, AlertCircle } from 'lucide-react'
import { Order, ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from '../types/order'
import { formatCurrency, formatDate } from '../../../utils/formatters'
import { Badge } from '../../../components/ui/Badge'
import { OptimizedImage } from '../../../components/common/OptimizedImage'

interface OrderDetailsProps {
  order: Order
  onCancel?: () => void
  isCancelling?: boolean
}

export function OrderDetails({ order, onCancel, isCancelling }: OrderDetailsProps) {
  // const statusColor = ORDER_STATUS_COLORS[order.orderStatus]
  const statusLabel = ORDER_STATUS_LABELS[order.orderStatus]
  const typeLabel = ORDER_TYPE_LABELS[order.orderType]
  const canCancel = order.orderStatus === 'pending'

  return (
    <div className="space-y-6">
      {/* Order Status Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">ትዕዛዝ #{order.orderId}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <Badge variant={order.orderStatus === 'cancelled' ? 'danger' : 'info'}>
                {statusLabel}
              </Badge>
              <Badge variant="secondary">{typeLabel}</Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar size={14} />
                <span>{formatDate(order.$createdAt, 'PPP')}</span>
              </div>
            </div>
          </div>
          
          {canCancel && onCancel && (
            <button
              onClick={onCancel}
              disabled={isCancelling}
              className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              {isCancelling ? 'በመሰረዝ ላይ...' : 'ትዕዛዝ ሰርዝ'}
            </button>
          )}
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">የደንበኛ መረጃ</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <User size={18} className="text-gray-400" />
            <span>{order.userName}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400" />
            <span>{order.userPhone}</span>
          </div>
          {order.orderType === 'delivery' && (
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <span className="flex-1">{order.deliveryAddress}</span>
            </div>
          )}
          {order.orderType === 'pickup' && (
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-gray-400" />
              <span>ከሱቅ አንሳ</span>
            </div>
          )}
          {order.deliveryTime === 'scheduled' && order.scheduledTime && (
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-gray-400" />
              <span>የታቀደ ሰዓት: {formatDate(order.scheduledTime, 'PPP p')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">የትዕዛዝ ዕቃዎች</h2>
        </div>
        
        <div className="divide-y">
          {order.items.map((item, idx) => (
            <div key={idx} className="p-4 flex gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <OptimizedImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.unit}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(item.price * item.quantity)}</div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} x {formatCurrency(item.price)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Totals */}
        <div className="p-4 border-t bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">ንዑስ ድምር</span>
              <span>{formatCurrency(order.subTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">የማድረስ ክፍያ</span>
              <span>{order.deliveryFee === 0 ? 'ነጻ' : formatCurrency(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t">
              <span>ጠቅላላ</span>
              <span className="text-primary">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-start gap-2">
            <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-yellow-800">ማስታወሻ</div>
              <p className="text-yellow-700 text-sm mt-1">{order.notes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}