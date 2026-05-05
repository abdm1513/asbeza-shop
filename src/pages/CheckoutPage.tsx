// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { CheckoutForm } from '../features/checkout/components/CheckoutForm'
// import { OrderConfirmationDialog } from '../features/orders/components/OrderConfirmationDialog'
// import { useCart } from '../features/cart'
// import { useAuth } from '../features/auth'
// import { PageLoader } from '../components/feedback/PageLoader'
// import { EmptyState } from '../components/feedback/EmptyState'
// import { Navigate } from 'react-router-dom'
// import { ArrowLeft } from 'lucide-react'

// export default function CheckoutPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { items, orderCalculation } = useCart()
//   const { user, isLoading: authLoading } = useAuth()
//   const [showConfirmation, setShowConfirmation] = useState(false)
//   const [completedOrderId, setCompletedOrderId] = useState<string>('')
//   const [completedTotal, setCompletedTotal] = useState<number>(0)

//   // Get delivery method from cart page state
//   const deliveryMethod = (location.state as any)?.deliveryMethod || 'delivery'
//   const passedDeliveryFee = (location.state as any)?.deliveryFee
//   const passedTotal = (location.state as any)?.total

//   // Use passed values or calculate based on method
//   const effectiveDeliveryFee = deliveryMethod === 'pickup' 
//     ? 0 
//     : (passedDeliveryFee !== undefined ? passedDeliveryFee : orderCalculation.deliveryFee)
//   const effectiveTotal = deliveryMethod === 'pickup'
//     ? orderCalculation.subtotal
//     : (passedTotal !== undefined ? passedTotal : orderCalculation.subtotal + orderCalculation.deliveryFee)

//   if (authLoading) {
//     return <PageLoader />
//   }

//   if (!user) {
//     return <Navigate to="/login" state={{ from: '/checkout' }} replace />
//   }

//   if (items.length === 0) {
//     return (
//       <div className="container-custom py-12">
//         <EmptyState 
//           type="cart"
//           action={{
//             label: "ወደ ምርቶች ሂድ",
//             onClick: () => navigate('/products')
//           }}
//         />
//       </div>
//     )
//   }

//   if (orderCalculation.needsMinimumOrder) {
//     return (
//       <div className="container-custom py-12">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">ዝቅተኛ ትዕዛዝ {orderCalculation.remainingForMinimum} ብር ያስፈልጋል</p>
//           <button onClick={() => navigate('/cart')} className="btn-primary">
//             ወደ ጋሪ ተመለስ
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const handleOrderPlaced = (orderId: string, total: number) => {
//     console.log('Order placed callback received:', orderId, total)
//     setCompletedOrderId(orderId)
//     setCompletedTotal(total)
//     setShowConfirmation(true)
//   }

//   const handleConfirmationClose = () => {
//     console.log('Closing confirmation dialog - navigating to orders')
//     setShowConfirmation(false)
//     navigate('/orders')
//   }

//   return (
//     <>
//       <div className="container-custom py-6 sm:py-8">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-primary transition mb-6"
//         >
//           <ArrowLeft size={20} />
//           ተመለስ
//         </button>
        
//         <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">ትዕዛዝ አስገባ</h1>
        
//         <CheckoutForm 
//           defaultDeliveryMethod={deliveryMethod}
//           defaultDeliveryFee={effectiveDeliveryFee}
//           defaultTotal={effectiveTotal}
//           onOrderPlaced={handleOrderPlaced}
//         />
//       </div>
      
//       {/* Render dialog directly when showConfirmation is true */}
//       {showConfirmation && (
//         <OrderConfirmationDialog
//           isOpen={showConfirmation}
//           onClose={handleConfirmationClose}
//           orderId={completedOrderId}
//           total={completedTotal}
//         />
//       )}
//     </>
//   )
// }

import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckoutForm } from '../features/checkout/components/CheckoutForm'
import { OrderConfirmationDialog } from '../features/orders/components/OrderConfirmationDialog'
import { useCart } from '../features/cart'
import { useAuth } from '../features/auth'
import { PageLoader } from '../components/feedback/PageLoader'
import { EmptyState } from '../components/feedback/EmptyState'
import { Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { items, orderCalculation, clearCart } = useCart()
  const { user, isLoading: authLoading } = useAuth()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [completedOrderId, setCompletedOrderId] = useState<string>('')
  const [completedTotal, setCompletedTotal] = useState<number>(0)

  const deliveryMethod = (location.state as any)?.deliveryMethod || 'delivery'
  const passedDeliveryFee = (location.state as any)?.deliveryFee
  const passedTotal = (location.state as any)?.total

  const effectiveDeliveryFee = deliveryMethod === 'pickup' 
    ? 0 
    : (passedDeliveryFee !== undefined ? passedDeliveryFee : orderCalculation.deliveryFee)
  const effectiveTotal = deliveryMethod === 'pickup'
    ? orderCalculation.subtotal
    : (passedTotal !== undefined ? passedTotal : orderCalculation.subtotal + orderCalculation.deliveryFee)

  if (authLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
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

  if (orderCalculation.needsMinimumOrder) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">ዝቅተኛ ትዕዛዝ {orderCalculation.remainingForMinimum} ብር ያስፈልጋል</p>
          <button onClick={() => navigate('/cart')} className="btn-primary">
            ወደ ጋሪ ተመለስ
          </button>
        </div>
      </div>
    )
  }

  const handleOrderPlaced = (orderId: string, total: number) => {
    console.log('Order placed, showing dialog with:', orderId, total)
    setCompletedOrderId(orderId)
    setCompletedTotal(total)
    setShowConfirmation(true)
  }

  const handleConfirmationClose = () => {
    console.log('Dialog closed, clearing cart and navigating to orders')
    setShowConfirmation(false)
    clearCart() // Clear cart only after dialog is closed
    navigate('/orders')
  }

  return (
    <>
      <div className="container-custom py-6 sm:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition mb-6"
        >
          <ArrowLeft size={20} />
          ተመለስ
        </button>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">ትዕዛዝ አስገባ</h1>
        
        <CheckoutForm 
          defaultDeliveryMethod={deliveryMethod}
          defaultDeliveryFee={effectiveDeliveryFee}
          defaultTotal={effectiveTotal}
          onOrderPlaced={handleOrderPlaced}
        />
      </div>
      
      <OrderConfirmationDialog
        isOpen={showConfirmation}
        onClose={handleConfirmationClose}
        orderId={completedOrderId}
        total={completedTotal}
      />
    </>
  )
}