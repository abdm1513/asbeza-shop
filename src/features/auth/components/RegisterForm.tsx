import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, RegisterFormData } from '../schemas/authSchema'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff, Check, X } from 'lucide-react'

interface RegisterFormProps {
  onSuccess?: () => void
  redirectPath?: string
}

export function RegisterForm({ onSuccess, redirectPath = '/' }: RegisterFormProps) {
  const { register: registerUser, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  })

  const password = watch('password', '')
  
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)
    
    // Normalize phone number
    let normalizedPhone = data.phone
    if (normalizedPhone.startsWith('0')) {
      normalizedPhone = '+251' + normalizedPhone.substring(1)
    }
    if (normalizedPhone.startsWith('251') && !normalizedPhone.startsWith('+')) {
      normalizedPhone = '+' + normalizedPhone
    }
    
    try {
      await registerUser(normalizedPhone, data.password, data.name, data.address)
      onSuccess?.()
      window.location.href = redirectPath
    } catch (err: any) {
      setError(err.message || 'የሆነ ስህተት ተከስቷል')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        label="ሙሉ ስም"
        placeholder="ስምዎን ያስገቡ"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="ስልክ ቁጥር"
        placeholder="+251912023119 ወይም 0912023119"
        {...register('phone')}
        error={errors.phone?.message}
        helperText="ምሳሌ: +251912023119, 0912023119"
      />

      <div className="relative">
        <Input
          label="የይለፍ ቃል"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          {...register('password')}
          error={errors.password?.message}
          onFocus={() => setShowPasswordRequirements(true)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showPasswordRequirements && (
        <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
          <p className="font-semibold text-gray-700 mb-1">የይለፍ ቃል መስፈርቶች:</p>
          <div className={`flex items-center gap-2 ${hasMinLength ? 'text-green-600' : 'text-gray-500'}`}>
            {hasMinLength ? <Check size={12} /> : <X size={12} />}
            <span>ቢያንስ 8 ቁምፊ</span>
          </div>
          <div className={`flex items-center gap-2 ${hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
            {hasUpperCase ? <Check size={12} /> : <X size={12} />}
            <span>ቢያንስ አንድ ካፒታል ፊደል (A-Z)</span>
          </div>
          <div className={`flex items-center gap-2 ${hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
            {hasLowerCase ? <Check size={12} /> : <X size={12} />}
            <span>ቢያንስ አንድ ስሞል ፊደል (a-z)</span>
          </div>
          <div className={`flex items-center gap-2 ${hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
            {hasNumber ? <Check size={12} /> : <X size={12} />}
            <span>ቢያንስ አንድ ቁጥር (0-9)</span>
          </div>
        </div>
      )}

      <div className="relative">
        <Input
          label="የይለፍ ቃል ማረጋገጫ"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="********"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <Input
        label="አድራሻ (አማራጭ)"
        placeholder="አድራሻዎን ያስገቡ"
        {...register('address')}
        error={errors.address?.message}
      />

      <Button type="submit" isLoading={isLoading} fullWidth>
        ተመዝገብ
      </Button>
    </form>
  )
}