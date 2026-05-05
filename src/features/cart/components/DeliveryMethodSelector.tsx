import { Truck, Building2 } from 'lucide-react'

export type DeliveryMethod = 'delivery' | 'pickup'

interface DeliveryMethodSelectorProps {
  selectedMethod: DeliveryMethod
  onMethodChange: (method: DeliveryMethod) => void
  deliveryFee?: number
}

export function DeliveryMethodSelector({
  selectedMethod,
  onMethodChange,
  deliveryFee = 50
}: DeliveryMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block font-semibold text-gray-800">የማድረስ ዘዴ</label>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onMethodChange('delivery')}
          className={`p-4 border-2 rounded-xl text-left transition-all ${
            selectedMethod === 'delivery'
              ? 'border-primary bg-primary-50'
              : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <Truck className={selectedMethod === 'delivery' ? 'text-primary' : 'text-gray-400'} size={24} />
            <div>
              <div className="font-semibold">ማድረስ</div>
              <div className="text-sm text-gray-500">{deliveryFee} ብር</div>
            </div>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => onMethodChange('pickup')}
          className={`p-4 border-2 rounded-xl text-left transition-all ${
            selectedMethod === 'pickup'
              ? 'border-primary bg-primary-50'
              : 'border-gray-200 hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <Building2 className={selectedMethod === 'pickup' ? 'text-primary' : 'text-gray-400'} size={24} />
            <div>
              <div className="font-semibold">አንሳ</div>
              <div className="text-sm text-gray-500">ነጻ</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}