import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../features/cart'
import { ROUTES } from '../../config/appConfig'
import { formatCurrency } from '../../utils/formatters'

export function CartFloatingButton() {
  const { itemCount, totalPrice } = useCart()

  if (itemCount === 0) return null

  return (
    <Link
      to={ROUTES.cart}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-primary text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-200"
    >
      <div className="relative">
        <ShoppingCart size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-secondary text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      <span className="font-semibold">{formatCurrency(totalPrice)}</span>
    </Link>
  )
}