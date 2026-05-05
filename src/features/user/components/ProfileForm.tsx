import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../../../components/ui/Input'
import { Button } from '../../../components/ui/Button'
import { useAuth } from '../../auth'
import toast from 'react-hot-toast'
import { User, Phone, MapPin, Save } from 'lucide-react'

const profileSchema = z.object({
  name: z.string().min(2, 'ስም ቢያንስ 2 ቁምፊ መሆን አለበት'),
  address: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export function ProfileForm() {
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      address: user?.address || '',
    }
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      await updateProfile(data)
      toast.success('መገለጫ በተሳካ ሁኔታ ተዘምኗል')
    } catch (error) {
      toast.error('ማዘመን አልተሳካም። እባክዎ ይሞክሩ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <User size={20} className="text-primary" />
          <h3 className="font-semibold text-gray-800">የመገለጫ መረጃ</h3>
        </div>
        <p className="text-xs text-gray-500">የግል መረጃዎን ያዘምኑ</p>
      </div>

      <div className="relative">
        <Input
          label="ሙሉ ስም"
          placeholder="ስምዎን ያስገቡ"
          {...register('name')}
          error={errors.name?.message}
          className="pl-10"
        />
        <User size={18} className="absolute left-3 top-[42px] text-gray-400" />
      </div>

      <div className="relative">
        <Input
          label="ስልክ ቁጥር"
          value={user?.phone || ''}
          disabled
          className="bg-gray-100 pl-10"
        />
        <Phone size={18} className="absolute left-3 top-[42px] text-gray-400" />
        <p className="text-xs text-gray-500 mt-1">ስልክ ቁጥርዎን መለወጥ አይቻልም</p>
      </div>

      <div className="relative">
        <Input
          label="አድራሻ"
          placeholder="አድራሻዎን ያስገቡ"
          {...register('address')}
          error={errors.address?.message}
          className="pl-10"
        />
        <MapPin size={18} className="absolute left-3 top-[42px] text-gray-400" />
      </div>

      <Button type="submit" isLoading={isLoading} fullWidth>
        <Save size={18} className="mr-2" />
        መገለጫ አዘምን
      </Button>
    </form>
  )
}