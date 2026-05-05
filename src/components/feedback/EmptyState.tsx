// components/feedback/EmptyState.tsx
import { ShoppingBag, Package, Search } from 'lucide-react'

interface EmptyStateProps {
  type: 'cart' | 'orders' | 'search'
  action?: {
    label: string
    onClick: () => void
  }
}

const icons = {
  cart: ShoppingBag,
  orders: Package,
  search: Search,
}

const messages = {
  cart: {
    title: 'ጋሪዎ ባዶ ነው',
    description: 'ምርቶችን ይጨምሩ እና ትዕዛዝ ያስገቡ',
  },
  orders: {
    title: 'ምንም ትዕዛዞች የሉም',
    description: 'እስካሁን ምንም ትዕዛዝ አላስገቡም',
  },
  search: {
    title: 'ምንም ውጤት አልተገኘም',
    description: 'እባክዎ ሌላ ቃል ይሞክሩ',
  },
}

export function EmptyState({ type, action }: EmptyStateProps) {
  const Icon = icons[type]
  const { title, description } = messages[type]

  return (
    <div className="text-center py-12">
      <Icon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  )
}