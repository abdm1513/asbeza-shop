import { Dialog } from '../../../components/ui/Dialog'
import { Button } from '../../../components/ui/Button'
import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  redirectPath?: string
}

export function AuthModal({ isOpen, onClose, redirectPath = '/' }: AuthModalProps) {
  const navigate = useNavigate()

//   const benefits = [
//     { icon: ShoppingBag, text: 'ቀላል የግዢ ሂደት' },
//     { icon: Truck, text: 'ፈጣን ማድረስ' },
//     { icon: Shield, text: 'ደህንነቱ የተጠበቀ ክፍያ' },
//     { icon: Award, text: 'ልዩ ቅናሾች እና አገልግሎቶች' }
//   ]

  const handleLogin = () => {
    onClose()
    navigate('/login', { state: { from: redirectPath } })
  }

  const handleRegister = () => {
    onClose()
    navigate('/register', { state: { from: redirectPath } })
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Lock size={32} className="text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          እንኳን ደህና መጡ!
        </h2>
        
        <p className="text-gray-600 mb-6">
          ትዕዛዝ ለማስገባት እና ሙሉ አገልግሎታችንን ለማግኘት እባክዎ ይግቡ ወይም ይመዝገቡ።
        </p>

        {/* Benefits */}
        {/* <div className="grid grid-cols-2 gap-3 mb-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
              <benefit.icon size={16} className="text-primary" />
              <span>{benefit.text}</span>
            </div>
          ))}
        </div> */}

        <div className="space-y-3">
          <Button onClick={handleLogin} fullWidth>
            ግባ
          </Button>
          
          <Button onClick={handleRegister} variant="outline" fullWidth>
            አዲስ መለያ ፍጠር
          </Button>
        </div>
        
        <p className="text-xs text-gray-400 mt-4">
          በመቀጠል የአገልግሎት ውላችንን እና የግላዊነት ፖሊሲያችንን ተቀብለዋል ማለት ነው።
        </p>
      </div>
    </Dialog>
  )
}