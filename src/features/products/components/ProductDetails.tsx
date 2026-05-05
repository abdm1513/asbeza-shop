import { useState } from 'react'
import { ShoppingCart, Plus, Minus, Check, Truck, Package, Clock } from 'lucide-react'
import { OptimizedImage } from '../../../components/common/OptimizedImage'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'
import { formatCurrency } from '../../../utils/formatters'
import { useCart } from '../../cart'
import { APP_CONFIG } from '../../../config/appConfig'

interface ProductDetailsProps {
  product: {
    $id: string
    name: string
    price: number
    unit: string
    images: string[]
    description?: string
    isAvailable: boolean
    stockQuantity: number
  }
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem, getItemQuantity } = useCart()
  const existingQuantity = getItemQuantity(product.$id)
//   const currentQuantity = existingQuantity > 0 ? existingQuantity : quantity

  const handleAddToCart = () => {
    addItem({
      productId: product.$id,
      name: product.name,
      price: product.price,
      quantity: existingQuantity > 0 ? existingQuantity + quantity : quantity,
      image: product.images[0] || '',
      unit: product.unit
    })
    if (existingQuantity === 0) setQuantity(1)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity === 0) {
      addItem({ 
        productId: product.$id, 
        name: product.name, 
        price: product.price, 
        quantity: 0, 
        image: product.images[0] || '', 
        unit: product.unit 
      }, false)
    } else {
      addItem({ 
        productId: product.$id, 
        name: product.name, 
        price: product.price, 
        quantity: newQuantity, 
        image: product.images[0] || '', 
        unit: product.unit 
      }, true)
    }
  }

  const totalPrice = product.price * (existingQuantity > 0 ? existingQuantity + quantity : quantity)

  if (!product.isAvailable) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">ይቅርታ ይህ ምርት አይገኝም</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-3">
        <div className="bg-gray-100 rounded-2xl overflow-hidden">
          <OptimizedImage
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.slice(1).map((img, idx) => (
              <div key={idx} className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <OptimizedImage src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{product.name}</h1>
        
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-primary">{formatCurrency(product.price)}</span>
          <span className="text-gray-500">/ {product.unit}</span>
        </div>

        {product.stockQuantity > 0 && product.stockQuantity < 10 && (
          <Badge variant="warning">
            {product.stockQuantity} ብቻ ቀርቷል
          </Badge>
        )}

        {product.description && (
          <div className="border-t border-b py-4">
            <h3 className="font-semibold mb-2">ምርት መግለጫ</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="space-y-3">
          <label className="font-semibold">ብዛት</label>
          {existingQuantity > 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => handleUpdateQuantity(existingQuantity - 1)}
                  className="p-2 hover:bg-white rounded-lg transition"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{existingQuantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(existingQuantity + 1)}
                  className="p-2 hover:bg-white rounded-lg transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <div className="text-lg font-semibold text-primary">
                {formatCurrency(product.price * existingQuantity)}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white rounded-lg transition"
                >
                  <Minus size={20} />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white rounded-lg transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1">
                <ShoppingCart size={20} className="mr-2" />
                ጋሪ ላይ ጨምር - {formatCurrency(totalPrice)}
              </Button>
            </div>
          )}
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Truck size={18} className="text-primary" />
            <span>
              ማድረስ: {
                APP_CONFIG.minOrderAmount <= product.price ? 
                'ዝቅተኛ ትዕዛዝ ላይ ደርሰዋል' : 
                `ዝቅተኛ ትዕዛዝ ${APP_CONFIG.minOrderAmount} ብር`
              }
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Package size={18} className="text-primary" />
            <span>ክፍያ: ካሽ ኦን ደሊቨሪ</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock size={18} className="text-primary" />
            <span>ማድረስ: 30-60 ደቂቃ</span>
          </div>
        </div>

        {existingQuantity > 0 && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <Check size={18} />
            <span className="text-sm">በጋሪዎ ውስጥ አለ</span>
          </div>
        )}
      </div>
    </div>
  )
}