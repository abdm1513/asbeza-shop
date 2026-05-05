// components/wrapper/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundaryClass extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          onRetry={() => {
            this.setState({ hasError: false, error: undefined, errorInfo: undefined })
            window.location.reload()
          }}
        />
      )
    }

    return this.props.children
  }
}

function ErrorFallback({ error, onRetry }: { error?: Error; onRetry: () => void }) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
    // Small delay to allow navigation to complete before resetting error state
    setTimeout(() => {
      onRetry()
    }, 100)
  }

  const handleGoHome = () => {
    navigate('/')
    setTimeout(() => {
      onRetry()
    }, 100)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="text-6xl mb-4">😵</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          የሆነ ስህተት ተከስቷል
        </h1>
        <p className="text-gray-600 mb-6">
          {error?.message || 'እባክዎ ገፁን እንደገና ጫኑ ወይም በኋላ ይሞክሩ'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            ወደ ኋላ ተመለስ
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2.5 border border-primary text-primary rounded-lg hover:bg-primary-50 transition"
          >
            ወደ መነሻ ገፅ ሂድ
          </button>
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            እንደገና ሞክር
          </button>
        </div>
      </div>
    </div>
  )
}

export const ErrorBoundary = ErrorBoundaryClass