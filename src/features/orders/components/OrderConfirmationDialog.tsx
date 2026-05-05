import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../../../components/ui/Button'
import { CheckCircle, Package, Truck, Clock, Printer, X } from 'lucide-react'
import { formatCurrency } from '../../../utils/formatters'

interface OrderConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  orderId?: string
  total?: number
  estimatedTime?: string
}

export function OrderConfirmationDialog({ 
  isOpen, 
  onClose, 
  orderId, 
  total,
  estimatedTime = '30-60 ደቂቃ'
}: OrderConfirmationDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      console.log('Dialog should be open with:', { orderId, total })
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, orderId, total])

  const handlePrint = () => {
    const printContent = document.getElementById('order-confirmation-content')
    if (printContent) {
      const originalContent = document.body.innerHTML
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContent
      window.location.reload()
    }
  }

  if (!mounted || !isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
      <div 
        className="fixed inset-0 bg-black bg-opacity-10" 
        onClick={onClose}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-[90%] sm:max-w-md mx-auto z-10 animate-modal-pop max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={20} />
        </button>
        
        <div id="order-confirmation-content" className="p-4 sm:p-6">
          <div className="text-center">
           <div className="inline-flex items-center justify-center w-8 h-8 sm:w-16 sm:h-16 bg-green-100 rounded-full mb-3 sm:mb-4">
              <CheckCircle size={18} className="sm:size-32 text-green-600" />
            </div>

            <h2 className="text-md sm:text-2xl font-bold text-gray-800 mb-2">
              ትዕዛዝዎ ተልኳል!
            </h2>
            
            <p className=" text-sm sm:text-md text-gray-600 mb-6">
              ለማድረስ በመዘጋጀት ላይ ነው
            </p>
            
            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500">የትዕዛዝ ቁጥር</p>
                <p className="text-lg font-semibold text-primary">{orderId}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
              {total !== undefined && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <Package size={20} className="text-primary mx-auto mb-1" />
                  <p className="text-sm text-gray-500">ጠቅላላ</p>
                  <p className="font-semibold">{formatCurrency(total)}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-3">
                <Clock size={20} className="text-primary mx-auto mb-1" />
                <p className="text-sm text-gray-500">ግምታዊ ጊዜ</p>
                <p className="font-semibold">{estimatedTime}</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-3 mb-6 text-sm text-green-700">
              <Truck size={16} className="inline mr-1" />
              ትዕዛዝዎ ተቀባይነት አግኝቷል! በቅርቡ ያግኙዎታል።
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button variant="outline" onClick={handlePrint} fullWidth>
                <Printer size={16} className="mr-2" />
                አትም
              </Button>
              <Button onClick={onClose} fullWidth>
                ወደ ትዕዛዞች ሂድ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}