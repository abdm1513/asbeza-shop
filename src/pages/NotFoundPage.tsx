import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          ገፁ አልተገኘም
        </h1>
        <p className="text-gray-600 mb-8">
          የሚፈልጉት ገፅ ተወግዷል ወይም አልተገኘም።
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary inline-flex items-center justify-center gap-2">
            <Home size={18} />
            ወደ መነሻ ገፅ ሂድ
          </Link>
          <button
            onClick={() => window.history.back()}
            className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            ተመለስ
          </button>
        </div>
        
        <div className="mt-8">
          <Link to="/products" className="text-primary hover:underline inline-flex items-center gap-1">
            <Search size={16} />
            ምርቶችን ይፈልጉ
          </Link>
        </div>
      </div>
    </div>
  )
}