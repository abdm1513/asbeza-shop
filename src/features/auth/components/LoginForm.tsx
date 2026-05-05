import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { loginSchema, LoginFormData } from '../schemas/authSchema'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

interface LoginFormProps {
  onSuccess?: () => void
  redirectPath?: string
}

export function LoginForm({ onSuccess, redirectPath = '/' }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    try {
      await login(data.phone, data.password)
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
        label="ስልክ ቁጥር"
        placeholder="+251912023119 ወይም 0912023119"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <div>
        <Input
          label="የይለፍ ቃል"
          type={showPassword ? 'text' : 'password'}
          placeholder="********"
          {...register('password')}
          error={errors.password?.message}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[42px] text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
          የይለፍ ቃል ረሳሁ?
        </Link>
      </div>

      <Button type="submit" isLoading={isLoading} fullWidth>
        ግባ
      </Button>
    </form>
  )
}