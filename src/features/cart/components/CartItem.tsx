import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { OptimizedImage } from '../../../components/common/OptimizedImage'
import { formatCurrency } from '../../../utils/formatters'
import { CartItem as CartItemType } from '../types/cart'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const totalPrice = item.price * item.quantity

  const handleIncrement = () => {
    onUpdateQuantity(item.productId, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity === 1) {
      onRemove(item.productId)
    } else {
      onUpdateQuantity(item.productId, item.quantity - 1)
    }
  }

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      {/* Product Image */}
      <Link to={`/products/${item.productId}`} className="flex-shrink-0">
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
          <OptimizedImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Link to={`/products/${item.productId}`}>
              <h3 className="font-semibold text-gray-800 hover:text-primary transition line-clamp-2">
                {item.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-500 mt-1">{item.unit}</p>
            <p className="text-primary font-semibold mt-1">
              {formatCurrency(item.price)}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.productId)}
            className="p-1 text-gray-400 hover:text-red-500 transition"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg">
            <button
              onClick={handleDecrement}
              className="p-2 hover:bg-gray-200 rounded-l-lg transition"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-semibold">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-2 hover:bg-gray-200 rounded-r-lg transition"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="font-bold text-gray-800">
            {formatCurrency(totalPrice)}
          </div>
        </div>
      </div>
    </div>
  )
}