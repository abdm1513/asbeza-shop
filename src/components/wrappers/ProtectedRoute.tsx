// import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../../features/auth'
// import { PageLoader } from '../feedback/PageLoader'
// import { ROUTES } from '../../config/appConfig'

// export function ProtectedRoute() {
//   const { user, isLoading } = useAuth()

//   if (isLoading) {
//     return <PageLoader />
//   }

//   if (!user) {
//     return <Navigate to={ROUTES.login} replace />
//   }

//   return <Outlet />
// }
// components/wrapper/ProtectedRoute.tsx
import { useState, useEffect } from 'react'
import {  Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth'
import { AuthModal } from '../../features/auth/components/AuthModal'
import { PageLoader } from '../feedback/PageLoader'
import { Lock } from 'lucide-react'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal after loading is complete and user is not authenticated
    if (!isLoading && !user) {
      setShowModal(true)
    }
  }, [isLoading, user])

  if (isLoading) {
    return <PageLoader />
  }

  if (!user) {
    return (
      <>
        <AuthModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)}
          redirectPath={location.pathname}
        />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Lock size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">እባክዎ ይግቡ ወይም ይመዝገቡ</p>
          </div>
        </div>
      </>
    )
  }

  return <Outlet />
}