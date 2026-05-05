import { useParams, useNavigate } from 'react-router-dom'
import { useOrder, useCancelOrder } from '../features/orders'
import { OrderDetails } from '../features/orders/components/OrderDetails'
import { PageLoader } from '../components/feedback/PageLoader'
import { ErrorState } from '../components/feedback/ErrorState'
import { ArrowLeft } from 'lucide-react'

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: order, isLoading, error, refetch } = useOrder(id!)
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()

  if (isLoading) return <PageLoader />
  
  if (error || !order) {
    return (
      <div className="container-custom py-12">
        <ErrorState onRetry={refetch} />
      </div>
    )
  }

  const handleCancel = () => {
    if (window.confirm('እርግጠኛ ነዎት ይህን ትዕዛዝ መሰረዝ ይፈልጋሉ?')) {
      cancelOrder(order.$id, {
        onSuccess: () => {
          refetch()
        }
      })
    }
  }

  return (
    <div className="container-custom py-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-primary transition mb-6"
      >
        <ArrowLeft size={20} />
        ተመለስ
      </button>
      
      <OrderDetails 
        order={order} 
        onCancel={handleCancel}
        isCancelling={isCancelling}
      />
    </div>
  )
}