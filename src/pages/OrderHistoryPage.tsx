import { useAuth } from '../features/auth'
import { useOrders } from '../features/orders'
import { OrderCard } from '../features/orders/components/OrderCard'
import { useCancelOrder } from '../features/orders'
import { PageLoader } from '../components/feedback/PageLoader'
import { EmptyState } from '../components/feedback/EmptyState'
import { Navigate } from 'react-router-dom'
import { Package, Filter } from 'lucide-react'
import { useState } from 'react'
import { OrderStatus } from '../features/orders/types/order'

export default function OrderHistoryPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { data: orders, isLoading: ordersLoading } = useOrders(user?.$id || '')
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')

  if (authLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (ordersLoading) {
    return <PageLoader />
  }

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders?.filter(order => order.orderStatus === statusFilter)

  const statusCounts = orders?.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  if (!orders || orders.length === 0) {
    return (
      <div className="container-custom py-12">
        <EmptyState 
          type="orders"
          action={{
            label: "ወደ ምርቶች ሂድ",
            onClick: () => window.location.href = '/products'
          }}
        />
      </div>
    )
  }

  return (
    <div className="container-custom py-6 sm:py-8">
      <div className="flex items-center gap-3 mb-6">
        <Package size={28} className="text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ትዕዛዞቼ</h1>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={16} className="text-gray-500" />
          <span className="text-sm text-gray-600">በሁኔታ አጣራ:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            ሁሉም ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            በመጠባበቅ ላይ ({statusCounts?.pending || 0})
          </button>
          <button
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'confirmed'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            ተረጋግጧል ({statusCounts?.confirmed || 0})
          </button>
          <button
            onClick={() => setStatusFilter('preparing')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'preparing'
                ? 'bg-purple-500 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            እየተዘጋጀ ነው ({statusCounts?.preparing || 0})
          </button>
          <button
            onClick={() => setStatusFilter('out-for-delivery')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'out-for-delivery'
                ? 'bg-orange-500 text-white'
                : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
            }`}
          >
            ለማድረስ ወጥቷል ({statusCounts?.['out-for-delivery'] || 0})
          </button>
          <button
            onClick={() => setStatusFilter('delivered')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'delivered'
                ? 'bg-green-500 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            ደርሷል ({statusCounts?.delivered || 0})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-full text-sm transition ${
              statusFilter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            ተሰርዟል ({statusCounts?.cancelled || 0})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders?.map((order) => (
          <OrderCard
            key={order.$id}
            order={order}
            onCancel={(orderId) => cancelOrder(orderId)}
            isCancelling={isCancelling}
          />
        ))}
      </div>

      {filteredOrders?.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          በዚህ ሁኔታ ውስጥ ምንም ትዕዛዞች የሉም
        </div>
      )}
    </div>
  )
}