import { Link, useLocation } from 'react-router-dom'
import { LoginForm } from '../features/auth'
import { ROUTES } from '../config/appConfig'

export default function LoginPage() {
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">እንኳን ደህና መጡ</h1>
          <p className="text-gray-500 mt-2">እባክዎ ወደ መለያዎ ይግቡ</p>
        </div>

        <LoginForm redirectPath={from} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            አዲስ መለያ የለዎትም?{' '}
            <Link to={ROUTES.register} state={{ from }} className="text-primary font-semibold hover:underline">
              ተመዝገብ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}