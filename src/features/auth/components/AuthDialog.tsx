import { useState } from 'react'
import { Dialog } from '../../../components/ui/Dialog'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { Lock, ShoppingBag, Truck, Shield, Award, X } from 'lucide-react'

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'login' | 'register'
  redirectPath?: string
}

export function AuthDialog({ isOpen, onClose, defaultMode = 'login', redirectPath = '/' }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode)

  const benefits = [
    { icon: ShoppingBag, text: 'ቀላል የግዢ ሂደት' },
    { icon: Truck, text: 'ፈጣን ማድረስ' },
    { icon: Shield, text: 'ደህንነቱ የተጠበቀ ክፍያ' },
    { icon: Award, text: 'ልዩ ቅናሾች እና አገልግሎቶች' }
  ]

  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="md">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Lock size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'login' ? 'እንኳን ደህና መጡ!' : 'አዲስ መለያ ይፍጠሩ'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login' 
              ? 'ወደ መለያዎ ይግቡ እና ግዢዎን ይቀጥሉ'
              : 'እባክዎ መረጃዎን ይሙሉ እና መለያ ይፍጠሩ'}
          </p>
        </div>

        {/* Benefits - only show for registration */}
        {mode === 'register' && (
          <div className="grid grid-cols-2 gap-2 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
                <benefit.icon size={14} className="text-primary" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Forms */}
        {mode === 'login' ? (
          <LoginForm onSuccess={handleSuccess} redirectPath={redirectPath} />
        ) : (
          <RegisterForm onSuccess={handleSuccess} redirectPath={redirectPath} />
        )}

        {/* Toggle Mode */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-primary hover:underline"
          >
            {mode === 'login' 
              ? 'አዲስ መለያ ፍጠር' 
              : 'አሁን ግባ'}
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          በመቀጠል የአገልግሎት ውላችንን እና የግላዊነት ፖሊሲያችንን ተቀብለዋል ማለት ነው።
        </p>
      </div>
    </Dialog>
  )
}