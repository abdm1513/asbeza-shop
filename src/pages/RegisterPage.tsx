import { Link, useLocation } from 'react-router-dom'
import { RegisterForm } from '../features/auth'
import { ROUTES } from '../config/appConfig'

export default function RegisterPage() {
  const location = useLocation()
  const from = (location.state as any)?.from || '/'

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">አዲስ መለያ ይፍጠሩ</h1>
          <p className="text-gray-500 mt-2">እባክዎ መረጃዎን ይሙሉ</p>
        </div>

        <RegisterForm redirectPath={from} />

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            አስቀድመው መለያ አለዎት?{' '}
            <Link to={ROUTES.login} state={{ from }} className="text-primary font-semibold hover:underline">
              ግባ
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}