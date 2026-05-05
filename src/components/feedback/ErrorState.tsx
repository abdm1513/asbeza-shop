// components/feedback/ErrorState.tsx
import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  error?: string
  onRetry?: () => void
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        ስህተት ተከስቷል
      </h3>
      <p className="text-gray-500 mb-6">
        {error || 'እባክዎ ቆይተው እንደገና ይሞክሩ'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary inline-flex items-center gap-2">
          <RefreshCw size={18} />
          እንደገና ሞክር
        </button>
      )}
    </div>
  )
}