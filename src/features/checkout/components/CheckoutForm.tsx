import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomerInfoForm } from './CustomerInfoForm'
import { CustomerInfoFormData } from '../schemas/checkoutSchema'
import { useCart } from '../../cart'
import { useAuth } from '../../auth'
import { useCheckout } from '../hooks/useCheckout'
import { OrderSummary } from './OrderSummary'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface CheckoutFormProps {
  defaultDeliveryMethod?: 'delivery' | 'pickup'
  defaultDeliveryFee?: number
  defaultTotal?: number
  onOrderPlaced?: (orderId: string, total: number) => void
}

export function CheckoutForm({ 
  defaultDeliveryMethod = 'delivery',
  defaultDeliveryFee = 0,
  defaultTotal = 0,
  onOrderPlaced 
}: CheckoutFormProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, totalPrice, orderCalculation } = useCart() // Remove clearCart from here
  const { createOrder } = useCheckout()
  
  const [step, setStep] = useState<'customer' | 'delivery'>('customer')
  const [customerData, setCustomerData] = useState<CustomerInfoFormData | null>(null)
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'scheduled'>('asap')
  const [scheduledTime, setScheduledTime] = useState<string>('')
  const [addressError, setAddressError] = useState<string | null>(null)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const deliveryMethod = defaultDeliveryMethod
  const subtotal = totalPrice
  const deliveryFee = defaultDeliveryFee
  const total = defaultTotal || subtotal + deliveryFee
  const isFreeDelivery = deliveryFee === 0
  const needsMinimumOrder = orderCalculation.needsMinimumOrder

  const handleCustomerSubmit = (data: CustomerInfoFormData) => {
    if (deliveryMethod === 'pickup') {
      data.address = data.address || ''
      setCustomerData(data)
      setStep('delivery')
    } else {
      if (!data.address || data.address.trim() === '') {
        setAddressError('እባክዎ አድራሻዎን ያስገቡ')
        toast.error('እባክዎ አድራሻዎን ያስገቡ')
        return
      }
      setAddressError(null)
      setCustomerData(data)
      setStep('delivery')
    }
  }

  const handlePlaceOrder = async () => {
    if (!customerData || !user) {
      toast.error('እባክዎ መረጃዎን ይሙሉ')
      return
    }
    
    if (deliveryMethod === 'delivery' && (!customerData.address || customerData.address.trim() === '')) {
      toast.error('እባክዎ አድራሻዎን ያስገቡ')
      setStep('customer')
      return
    }
    
    setIsPlacingOrder(true)
    
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    const orderId = `ORD-${timestamp}-${random}`
    
    const orderData = {
      orderId,
      userId: user.$id,
      userName: customerData.name,
      userPhone: customerData.phone,
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        unit: item.unit
      })),
      subTotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      orderType: deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? (customerData.address || '') : '',
      paymentMethod: 'cod' as const,
      deliveryTime: deliveryTime,
      scheduledTime: deliveryTime === 'scheduled' ? scheduledTime : undefined,
      notes: customerData.notes,
    }
    
    const success = await createOrder(orderData)
    
    if (success) {
      // Don't clear cart here - let the parent component handle it after dialog closes
      if (onOrderPlaced) {
        onOrderPlaced(orderId, total)
      }
    } else {
      toast.error('ትዕዛዝ መላክ አልተሳካም። እባክዎ ይሞክሩ')
    }
    
    setIsPlacingOrder(false)
  }

  if (needsMinimumOrder) {
    navigate('/cart')
    return null
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'customer' ? 'bg-primary text-white' : 'bg-green-500 text-white'}`}>
            {step === 'customer' ? 1 : <Check size={20} />}
          </div>
          <div className={`w-16 h-0.5 ${step === 'delivery' ? 'bg-green-500' : 'bg-gray-300'}`} />
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 'delivery' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}>
            2
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          {step === 'customer' ? (
            <CustomerInfoForm
              defaultValues={{
                name: user?.name || '',
                phone: user?.phone || '',
                address: user?.address || '',
              }}
              deliveryMethod={deliveryMethod}
              onSubmit={handleCustomerSubmit}
              isLoading={false}
              addressError={addressError}
            />
          ) : (
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3">የማድረስ ጊዜ</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-white transition">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="asap"
                      checked={deliveryTime === 'asap'}
                      onChange={() => setDeliveryTime('asap')}
                      className="text-primary"
                    />
                    <div>
                      <span className="font-medium">በተቻለ ፍጥነት (አሳፕ)</span>
                      <p className="text-xs text-gray-500">30-60 ደቂቃ</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-2 border rounded-lg cursor-pointer hover:bg-white transition">
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="scheduled"
                      checked={deliveryTime === 'scheduled'}
                      onChange={() => setDeliveryTime('scheduled')}
                      className="text-primary"
                    />
                    <div>
                      <span className="font-medium">በተወሰነ ሰዓት</span>
                      <p className="text-xs text-gray-500">የሚፈልጉትን ሰዓት ይምረጡ</p>
                    </div>
                  </label>
                </div>
                
                {deliveryTime === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <input
                      type="date"
                      className="input text-sm"
                      onChange={(e) => setScheduledTime(prev => {
                        const time = prev.split('T')[1] || '12:00'
                        return `${e.target.value}T${time}`
                      })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <input
                      type="time"
                      className="input text-sm"
                      onChange={(e) => setScheduledTime(prev => {
                        const date = prev.split('T')[0] || new Date().toISOString().split('T')[0]
                        return `${date}T${e.target.value}`
                      })}
                    />
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">የማድረስ ዘዴ</span>
                  <span className="font-medium">
                    {deliveryMethod === 'delivery' ? 'ማድረስ' : 'አንሳ'}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">የደንበኛ መረጃ</span>
                  <button
                    onClick={() => setStep('customer')}
                    className="text-primary text-xs hover:underline"
                  >
                    አርትዕ
                  </button>
                </div>
                <p className="text-gray-600">{customerData?.name}</p>
                <p className="text-gray-600">{customerData?.phone}</p>
                {deliveryMethod === 'delivery' && (
                  <p className="text-gray-600 text-xs mt-1 break-words">{customerData?.address}</p>
                )}
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep('customer')}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} />
                  ወደ ኋላ
                </button>
                <button 
                  onClick={handlePlaceOrder} 
                  className="flex-1 btn-primary flex items-center justify-center gap-2" 
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder ? 'በመስጠት ላይ...' : 'አስገባ'}
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            isFreeDelivery={isFreeDelivery}
          />
        </div>
      </div>
    </div>
  )
}