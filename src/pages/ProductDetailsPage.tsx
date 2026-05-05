import { useParams, useNavigate } from 'react-router-dom'
import { useProduct } from '../features/products/hooks/useProducts'
import { ProductDetails } from '../features/products/components/ProductDetails'
import { PageLoader } from '../components/feedback/PageLoader'
import { ErrorState } from '../components/feedback/ErrorState'
import { ArrowLeft } from 'lucide-react'

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, error, refetch } = useProduct(id!)

  if (isLoading) return <PageLoader />
  
  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <ErrorState onRetry={refetch} />
      </div>
    )
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
      
      <ProductDetails product={product} />
    </div>
  )
}