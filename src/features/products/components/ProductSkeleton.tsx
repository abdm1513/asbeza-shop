import { Skeleton } from '../../../components/ui/Skeleton'

export function ProductSkeleton() {
  return (
    <div className="card p-4">
      <Skeleton variant="rectangular" height="192px" className="mb-3 rounded-lg" />
      <Skeleton width="80%" className="mb-2" />
      <Skeleton width="60%" className="mb-2" />
      <div className="flex gap-2 mt-3">
        <Skeleton width="80px" height="36px" variant="rectangular" className="rounded-lg" />
        <Skeleton width="100%" height="36px" variant="rectangular" className="rounded-lg" />
      </div>
    </div>
  )
}