// import { ProductCard } from './ProductCard'
// import { ProductSkeleton } from './ProductSkeleton'
// import { Button } from '../../../components/ui/Button'

// interface ProductGridProps {
//   products: any[]
//   isLoading?: boolean
//   hasMore?: boolean
//   onLoadMore?: () => void
//   isFetchingNext?: boolean
 
// }

// export function ProductGrid({ 
//   products, 
//   isLoading = false, 
//   hasMore = false, 
//   onLoadMore, 
//   isFetchingNext = false,
// }: ProductGridProps) {
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
//         {Array.from({ length: 10 }).map((_, i) => (
//           <ProductSkeleton key={i} />
//         ))}
//       </div>
//     )
//   }

//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-500">ምንም ምርቶች አልተገኙም</p>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
//         {products.map((product) => (
//           <ProductCard key={product.$id} product={product} />
//         ))}
//       </div>
      
//       {hasMore && onLoadMore && (
//         <div className="flex justify-center mt-8">
//           <Button 
//             onClick={onLoadMore} 
//             isLoading={isFetchingNext}
//             variant="outline"
//           >
//             {isFetchingNext ? 'እየጫነ...' : 'ተጨማሪ ምርቶች'}
//           </Button>
//         </div>
//       )}
//     </div>
//   )
// }

import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'
import { Button } from '../../../components/ui/Button'
import { ErrorState } from '../../../components/feedback/ErrorState'

interface ProductGridProps {
  products: any[]
  isLoading?: boolean
  error?: unknown
  hasMore?: boolean
  onLoadMore?: () => void
  isFetchingNext?: boolean
}

export function ProductGrid({ 
  products, 
  isLoading = false, 
  error,
  hasMore = false, 
  onLoadMore, 
  isFetchingNext = false,
}: ProductGridProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState />
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        ምንም ምርቶች አልተገኙም
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
        {products.map((product) => (
          <ProductCard key={product.$id} product={product} />
        ))}
      </div>
      
      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={onLoadMore} 
            isLoading={isFetchingNext}
            variant="outline"
          >
            {isFetchingNext ? 'እየጫነ...' : 'ተጨማሪ ምርቶች'}
          </Button>
        </div>
      )}
    </div>
  )
}