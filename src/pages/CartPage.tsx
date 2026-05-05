import { useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, WifiOff } from 'lucide-react'
import { useCart } from '../features/cart'
import { CartItem } from '../features/cart/components/CartItem'
import { CartSummary } from '../features/cart/components/CartSummary'
import { DeliveryMethodSelector } from '../features/cart/components/DeliveryMethodSelector'
import { EmptyState } from '../components/feedback/EmptyState'
import { APP_CONFIG } from '../config/appConfig'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import toast from 'react-hot-toast'

export default function CartPage() {
  const navigate = useNavigate()
  const { 
    items, 
    orderCalculation, 
    updateQuantity, 
    removeItem,
    itemCount,
    deliveryMethod,
    setDeliveryMethod
  } = useCart()
  const isOnline = useOnlineStatus()

  const effectiveDeliveryFee = deliveryMethod === 'pickup' ? 0 : orderCalculation.deliveryFee
  const effectiveTotal = orderCalculation.subtotal + effectiveDeliveryFee
  const isFreeDelivery = deliveryMethod === 'pickup' || orderCalculation.isFreeDelivery

  const handleCheckout = () => {
    // Only check online for checkout (server operation)
    if (!isOnline) {
      toast.error('እባክዎ የኢንተርኔት ግንኙነትዎን ያረጋግጡ ትዕዛዝ ለማስገባት', {
        duration: 4000,
        icon: '📡',
      })
      return
    }
    navigate('/checkout', { 
      state: { 
        deliveryMethod,
        deliveryFee: effectiveDeliveryFee,
        total: effectiveTotal
      } 
    })
  }

  const handleDeliveryMethodChange = (method: 'delivery' | 'pickup') => {
    setDeliveryMethod(method)
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-12">
        <EmptyState 
          type="cart"
          action={{
            label: "ወደ ምርቶች ሂድ",
            onClick: () => navigate('/products')
          }}
        />
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

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <ShoppingBag size={28} />
        የግዢ ጋሪ ({itemCount} ዕቃዎች)
      </h1>

      {/* Offline Warning - Informational only */}
      {!isOnline && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <WifiOff size={20} className="text-yellow-600" />
          <div>
            <p className="text-sm font-medium text-yellow-800">ኢንተርኔት ግንኙነት የለም</p>
            <p className="text-xs text-yellow-600">እባክዎ ግንኙነትዎን ያረጋግጡ ትዕዛዝ ለማስገባት</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <DeliveryMethodSelector
              selectedMethod={deliveryMethod}
              onMethodChange={handleDeliveryMethodChange}
              deliveryFee={orderCalculation.deliveryFee}
            />
          </div>
        </div>

        <div>
          <CartSummary
            subtotal={orderCalculation.subtotal}
            deliveryFee={effectiveDeliveryFee}
            total={effectiveTotal}
            isFreeDelivery={isFreeDelivery}
            needsMinimumOrder={orderCalculation.needsMinimumOrder}
            remainingForMinimum={orderCalculation.remainingForMinimum}
            remainingForFreeDelivery={deliveryMethod === 'pickup' ? 0 : orderCalculation.remainingForFreeDelivery}
            itemCount={itemCount}
            onCheckout={handleCheckout}
          />
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            <p>ካሽ ኦን ደሊቨሪ ብቻ</p>
            <p className="mt-1">ዝቅተኛ ትዕዛዝ: {APP_CONFIG.minOrderAmount} ብር</p>
          </div>
        </div>
      </div>
    </div>
  )
}