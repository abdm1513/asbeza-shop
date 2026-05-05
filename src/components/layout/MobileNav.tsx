import { Link } from 'react-router-dom'
import { createPortal } from 'react-dom'
import {
  X,
  Home,
  Package,
  Info,
  Phone,
  User,
  LogOut,
  ClipboardList,
  UserCircle,
} from 'lucide-react'
import { useEffect } from 'react'
import { ROUTES } from '../../config/appConfig'

interface Props {
  open: boolean
  onClose: () => void
  user: any
  onLogout: () => void
}

export function MobileNav({ open, onClose, user, onLogout }: Props) {
  // Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="absolute top-0 left-0 h-screen w-[220px] bg-white shadow-xl flex flex-col z-10 animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-primary text-white">
          <h2 className="font-semibold text-lg">ምናሌ</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* User */}
        {user && (
          <div className="p-4 border-b border-gray-300">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        )}

        {/* Links */}
        <nav className="flex-1 overflow-y-auto">
          <NavLink to="/" icon={<Home size={20} />} label="ዋና ገፅ" onClick={onClose} />
          <NavLink to="/products" icon={<Package size={20} />} label="ምርቶች" onClick={onClose} />
          <NavLink to="/about" icon={<Info size={20} />} label="ስለ እኛ" onClick={onClose} />
          <NavLink to="/contact" icon={<Phone size={20} />} label="አግኙን" onClick={onClose} />

          {user && (
            <>
              <NavLink to={ROUTES.profile} icon={<UserCircle size={20} />} label="መገለጫ" onClick={onClose} />
              <NavLink to={ROUTES.orders} icon={<ClipboardList size={20} />} label="ትዕዛዞች" onClick={onClose} />
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300">
          {user ? (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut size={20} /> ውጣ
            </button>
          ) : (
            <Link
              to={ROUTES.login}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
            >
              <User size={20} /> ግባ
            </Link>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function NavLink({ to, icon, label, onClick }: any) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}