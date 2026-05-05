import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, ForgotPasswordFormData } from '../features/auth/schemas/authSchema'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { ROUTES } from '../config/appConfig'
import { authService } from '../features/auth/services/authService'
import toast from 'react-hot-toast'
import { Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    try {
      await authService.sendPasswordReset(data.phone)
      setIsSubmitted(true)
      toast.success('የይለፍ ቃል ማስተካከያ አገናኝ ተልኳል!')
    } catch (error) {
      toast.error('የሆነ ስህተት ተከስቷል። እባክዎ ይሞክሩ')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">ኢሜይል ተልኳል</h2>
          <p className="text-gray-600 mb-6">
            የይለፍ ቃል ማስተካከያ አገናኝ ወደ ኢሜይልዎ ተልኳል።
          </p>
          <Link to={ROUTES.login} className="text-primary hover:underline">
            ← ወደ መግቢያ ገፅ ተመለስ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">የይለፍ ቃል ረሳሁ</h1>
          <p className="text-gray-500 mt-2">
            ስልክ ቁጥርዎን ያስገቡ፣ የይለፍ ቃል ማስተካከያ አገናኝ እንልክልዎታለን
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="ስልክ ቁጥር"
            placeholder="+251912023119 ወይም 0912023119"
            {...register('phone')}
            error={errors.phone?.message}
          />
          
          <Button type="submit" isLoading={isLoading} fullWidth>
            አገናኝ ላክ
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to={ROUTES.login} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            <ArrowLeft size={14} />
            ወደ መግቢያ ገፅ ተመለስ
          </Link>
        </div>
      </div>
    </div>
  )
}