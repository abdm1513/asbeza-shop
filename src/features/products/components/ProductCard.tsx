import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OptimizedImage } from '../../../components/common/OptimizedImage'
import { formatCurrency } from '../../../utils/formatters'
import { useCart } from '../../cart'

interface ProductCardProps {
  product: {
    $id: string
    name: string
    price: number
    unit: string
    images: string[]
    isAvailable: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, getItemQuantity, updateQuantity } = useCart()
  const existingQuantity = getItemQuantity(product.$id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() 
    addItem({
      productId: product.$id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] || '',
      unit: product.unit
    })
  }

  const handleUpdate = (e: React.MouseEvent, type: 'inc' | 'dec') => {
    e.preventDefault() // Prevents Link navigation
    const newQty = type === 'inc' ? existingQuantity + 1 : Math.max(0, existingQuantity - 1)
    updateQuantity(product.$id, newQty)
  }

  return (
    <div className={`group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full ${!product.isAvailable ? 'opacity-60' : ''}`}>
      
      {/* Wrap image and info in Link, but NOT the footer buttons */}
      <Link to={`/products/${product.$id}`} className="flex flex-col flex-grow">
        
        {/* Image Wrapper */}
        <div className="relative aspect-square overflow-hidden bg-gray-50/50 ">
          <OptimizedImage 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Wrapper */}
        <div className="p-2 pb-0 flex flex-col">
          {/* Product Name - Forced to 1 line */}
          <h3 className="text-sm font-semibold text-gray-800 truncate w-full" title={product.name}>
            {product.name}
          </h3>

          {/* Price Row - Reduced top margin to decrease gap */}
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-base font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[10px] text-gray-500 font-medium">
              / {product.unit}
            </span>
          </div>

          {/* Subtotal Area */}
          <div className="h-4 mt-1 mb-2">
            {existingQuantity > 0 ? (
              <p className="text-[10px] font-bold text-primary">
                ጠቅላላ: {formatCurrency(product.price * existingQuantity)}
              </p>
            ) : (
              <p className="text-[9px] text-gray-400 uppercase tracking-tight">
                ያንድ {product.unit} ዋጋ
              </p>
            )}
          </div>
        </div>
      </Link>

      {/* Buttons stay outside/overlaying to handle their own clicks */}
      <div className="p-2 pt-0 h-12">
        {!product.isAvailable ? (
          <button disabled className="w-full h-full bg-gray-50 text-gray-400 rounded-xl text-xs font-medium">
            አይገኝም
          </button>
        ) : existingQuantity > 0 ? (
          <div className="flex items-center justify-between bg-primary text-white rounded-xl h-full">
            <button
              onClick={(e) => handleUpdate(e, 'dec')}
              className="h-full px-3 hover:bg-black/10 transition-colors rounded-l-xl"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            <span className="font-bold text-sm">{existingQuantity}</span>
            <button
              onClick={(e) => handleUpdate(e, 'inc')}
              className="h-full px-3 hover:bg-black/10 transition-colors rounded-r-xl"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full h-full bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            <span className="text-xs">ጨምር</span>
          </button>
        )}
      </div>
    </div>
  )
}
