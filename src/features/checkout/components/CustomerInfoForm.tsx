import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../../components/ui/Input'
import { CustomerInfoFormData, customerInfoSchema } from '../schemas/checkoutSchema'
import { useEffect } from 'react'

interface CustomerInfoFormProps {
  defaultValues?: Partial<CustomerInfoFormData>
  deliveryMethod?: 'delivery' | 'pickup'
  onSubmit: (data: CustomerInfoFormData) => void
  isLoading?: boolean
  addressError?: string | null
}

export function CustomerInfoForm({ 
  defaultValues, 
  deliveryMethod = 'delivery', 
  onSubmit, 
  isLoading = false,
  addressError 
}: CustomerInfoFormProps) {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, watch } = useForm<CustomerInfoFormData>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues,
    mode: 'onChange'
  })

  const isAddressRequired = deliveryMethod === 'delivery'
  const addressValue = watch('address')

  // Clear address error when user types
  useEffect(() => {
    if (addressValue && addressValue.trim() !== '') {
      clearErrors('address')
    }
  }, [addressValue, clearErrors])

  // External address error
  useEffect(() => {
    if (addressError) {
      setError('address', { message: addressError })
    }
  }, [addressError, setError])

  const onFormSubmit = (data: CustomerInfoFormData) => {
    console.log('Form submitted:', data)
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h3 className="text-md font-semibold text-gray-800">የደንበኛ መረጃ</h3>
        <p className="text-xs text-gray-500 mt-1">እባክዎ መረጃዎን በትክክል ይሙሉ</p>
      </div>
      
      <Input
        label="ሙሉ ስም"
        placeholder="ስምዎን ያስገቡ"
        {...register('name')}
        error={errors.name?.message}
      />
      
      <Input
        label="ስልክ ቁጥር"
        placeholder="09XXXXXXXX"
        {...register('phone')}
        error={errors.phone?.message}
      />
      
      <div>
        <Input
          label={isAddressRequired ? "አድራሻ *" : "አድራሻ (አማራጭ)"}
          placeholder={isAddressRequired ? "አድራሻዎን ያስገቡ" : "አድራሻዎን ያስገቡ (አማራጭ)"}
          {...register('address')}
          error={errors.address?.message}
        />
        {!isAddressRequired && (
          <p className="text-xs text-green-600 mt-1">
            ✓ ለማንሳት አድራሻ አያስፈልግም
          </p>
        )}
        {isAddressRequired && (
          <p className="text-xs text-gray-500 mt-1">
            ሙሉ አድራሻዎን ያስገቡ (ክፍል፣ ቤት ቁጥር፣ ወዘተ)
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ማስታወሻ (አማራጭ)</label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
          placeholder="ለማድረሻ ሰው ተጨማሪ መረጃ ካለ ያስገቡ..."
        />
      </div>
      
      <button 
        type="submit" 
        className="btn-primary w-full flex items-center justify-center gap-2" 
        disabled={isLoading}
      >
        {isLoading ? 'በመቀጠል ላይ...' : 'ቀጥል →'}
      </button>
    </form>
  )
}