import { Link } from 'react-router-dom'
import { Calendar, MapPin, Truck, Package, ChevronRight } from 'lucide-react'
import { Order, ORDER_STATUS_LABELS, ORDER_TYPE_LABELS } from '../types/order'
import { formatCurrency, formatRelativeTime } from '../../../utils/formatters'
import { Badge } from '../../../components/ui/Badge'

interface OrderCardProps {
  order: Order
  onCancel?: (orderId: string) => void
  isCancelling?: boolean
}

export function OrderCard({ order, onCancel, isCancelling }: OrderCardProps) {
  // const statusColor = ORDER_STATUS_COLORS[order.orderStatus]
  const statusLabel = ORDER_STATUS_LABELS[order.orderStatus]
  const typeLabel = ORDER_TYPE_LABELS[order.orderType]

  const canCancel = order.orderStatus === 'pending'

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border overflow-hidden">
      {/* Order Header */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap justify-between items-start gap-2">
          <div>
            <Link to={`/orders/${order.$id}`} className="text-primary font-semibold hover:underline">
              #{order.orderId}
            </Link>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={order.orderStatus === 'cancelled' ? 'danger' : 'info'} size="sm">
                {statusLabel}
              </Badge>
              <Badge variant="secondary" size="sm">
                {typeLabel}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-primary text-lg">{formatCurrency(order.total)}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <Calendar size={12} />
              <span>{formatRelativeTime(order.$createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Preview */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <Package size={16} />
          <span>{order.items.length} ዕቃዎች</span>
        </div>
        
        <div className="space-y-2 mb-3">
          {order.items.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600 line-clamp-1">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <div className="text-sm text-gray-500">
              + {order.items.length - 2} ተጨማሪ ዕቃዎች
            </div>
          )}
        </div>

        {/* Delivery Info */}
        {order.orderType === 'delivery' && (
          <div className="flex items-start gap-2 text-sm text-gray-600 mb-3">
            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{order.deliveryAddress}</span>
          </div>
        )}

        {order.orderType === 'pickup' && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <Truck size={16} />
            <span>ከሱቅ አንሳ</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        {canCancel && onCancel && (
          <button
            onClick={() => onCancel(order.$id)}
            disabled={isCancelling}
            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
          >
            {isCancelling ? 'በመሰረዝ ላይ...' : 'ሰርዝ'}
          </button>
        )}
        <Link
          to={`/orders/${order.$id}`}
          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center gap-1 ml-auto"
        >
          ዝርዝር ይመልከቱ
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  )
}