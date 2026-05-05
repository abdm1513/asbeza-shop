import { Loader2 } from 'lucide-react'

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-600">እባክዎ ይጠብቁ...</p>
      </div>
    </div>
  )
}