import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, Search, X, Menu, LogOut, UserCircle, ClipboardList } from 'lucide-react'
import { useCart } from '../../features/cart'
import { useAuth } from '../../features/auth'
import { useProducts } from '../../features/products/hooks/useProducts'
import { ROUTES } from '../../config/appConfig'
import { useDebounce } from '../../hooks/useDebounce'
import { OptimizedImage } from '../common/OptimizedImage'
import { formatCurrency } from '../../utils/formatters'
import { MobileNav } from './MobileNav'

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { itemCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const searchRef = useRef<HTMLDivElement>(null)
  const debouncedSearch = useDebounce(searchQuery, 400)

const { data: searchResults, isLoading: isSearching } = useProducts(
  debouncedSearch ? { search: debouncedSearch } : undefined
)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

     navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`, {
      replace: false,
    })
    setSearchQuery('')
    setShowResults(false)
    setIsSearchOpen(false)
  }

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`)
    setSearchQuery('')
    setShowResults(false)
    setIsSearchOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 gap-3">

          {/* Logo */}
          <Link
            to={ROUTES.home}
            className="text-xl sm:text-2xl font-bold text-primary tracking-tight hover:opacity-80"
          >
            ማርት ሱቅ
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition">ዋና ገፅ</Link>
            <Link to="/products" className="hover:text-primary transition">ምርቶች</Link>
            <Link to="/about" className="hover:text-primary transition">ስለ እኛ</Link>
            <Link to="/contact" className="hover:text-primary transition">አግኙን</Link>
          </nav>

          {/* Search */}
          <div ref={searchRef} className="hidden md:block flex-1 max-w-md relative">
            <form onSubmit={handleSearch}>
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                placeholder="ምርት ፈልግ..."
                className="w-full pl-4 pr-10 py-2 rounded-xl border focus:ring-2 focus:ring-primary outline-none"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </form>

            {showResults && searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border overflow-hidden">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">በመፈለግ ላይ...</div>
                ) : searchResults?.data?.length ? (
                  <>
                    {searchResults.data.slice(0, 5).map((p) => (
                      <button
                        key={p.$id}
                        onClick={() => handleProductClick(p.$id)}
                        className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 text-left"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <OptimizedImage src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-primary text-sm">{formatCurrency(p.price)}</p>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500">ምንም ውጤት የለም</div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Mobile search */}
            <button onClick={() => setIsSearchOpen(true)} className="md:hidden p-2">
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link to={ROUTES.cart} className="relative p-2">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="hidden md:block">
              {user ? (
                <div className="group relative">
                  <button className="flex items-center gap-2 p-2">
                    <User size={20} />
                    <span className="text-sm">{user.name.split(' ')[0]}</span>
                  </button>

                  <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="p-3 border-b bg-gray-50">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.phone}</p>
                    </div>

                    <Link to={ROUTES.profile} className="flex gap-2 px-4 py-2 hover:bg-gray-50">
                      <UserCircle size={16} /> መገለጫ
                    </Link>

                    <Link to={ROUTES.orders} className="flex gap-2 px-4 py-2 hover:bg-gray-50">
                      <ClipboardList size={16} /> ትዕዛዞች
                    </Link>

                    <button onClick={handleLogout} className="flex gap-2 px-4 py-2 w-full text-red-600 hover:bg-gray-50">
                      <LogOut size={16} /> ውጣ
                    </button>
                  </div>
                </div>
              ) : (
                <Link to={ROUTES.login}>
                  <User size={20} />
                </Link>
              )}
            </div>

            {/* Mobile menu */}
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div className="flex gap-3 items-center mb-4">
            <button onClick={() => setIsSearchOpen(false)}>
              <X />
            </button>

            <form onSubmit={handleSearch} className="flex-1">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowResults(true)
                }}
                className="w-full border rounded-lg px-4 py-2"
              />
            </form>
          </div>

          <div className="space-y-2">
          {showResults && searchQuery && (
             <div className="absolute left-10 right-10 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">በመፈለግ ላይ...</div>
                ) : searchResults?.data?.length ? (
                  <>
                    {searchResults.data.slice(0, 5).map((p) => (
                      <button
                        key={p.$id}
                        onClick={() => handleProductClick(p.$id)}
                        className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 text-left"
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <OptimizedImage src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{p.name}</p>
                          <p className="text-primary text-sm">{formatCurrency(p.price)}</p>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="p-4 text-center text-gray-500">ምንም ውጤት የለም</div>
                )}
              </div>
            )}
        </div>
        </div>
      )}
     

      <MobileNav
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  )
}