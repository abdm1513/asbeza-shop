import { useAuth } from '../features/auth'
import { ProfileForm } from '../features/user/components/ProfileForm'
import { PageLoader } from '../components/feedback/PageLoader'
import { Navigate } from 'react-router-dom'
import { UserCircle, LogOut } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="container-custom py-6 sm:py-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-4">
          <UserCircle size={40} className="text-primary" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">መገለጫ</h1>
        <p className="text-gray-500 mt-1">የግል መረጃዎን ያዘምኑ</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <ProfileForm />
      </div>

      <div className="mt-6">
        <Button 
          variant="danger" 
          onClick={logout}
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          ውጣ
        </Button>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
        <p>ስልክ ቁጥርዎን መለወጥ አይቻልም። ለእርዳታ ደንበኛ አገልግሎት ያግኙን።</p>
      </div>
    </div>
  )
}