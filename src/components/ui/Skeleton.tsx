interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = 'text', width, height, className = '' }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200'
  
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }
  
  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1em' : undefined)
  }
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} style={style} />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="card p-4">
      <Skeleton variant="rectangular" height="200px" className="mb-3" />
      <Skeleton width="80%" className="mb-2" />
      <Skeleton width="60%" className="mb-2" />
      <Skeleton width="40%" />
    </div>
  )
}

export function TextSkeleton({ lines = 1 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} width={`${Math.random() * 40 + 60}%`} />
      ))}
    </div>
  )
}