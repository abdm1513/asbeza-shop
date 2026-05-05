// import { HorizontalScroll } from '../../../components/common/HorizontalScroll'
// import { ProductCard } from './ProductCard'
// import { ProductSkeleton } from './ProductSkeleton'

// interface FeaturedProductsProps {
//   products: any[]
//   isLoading?: boolean
//   title?: string
// }

// export function FeaturedProducts({ products, isLoading, title = "ተወዳጅ ምርቶች" }: FeaturedProductsProps) {

//    if (isLoading) {
//     return (
//       <HorizontalScroll title={title}>
//         {Array.from({ length: 8 }).map((_, i) => (
//           <div key={i} className="w-[140px] sm:w-[160px] lg:w-[180px] flex-shrink-0">
//             <ProductSkeleton />
//           </div>
//         ))}
//       </HorizontalScroll>
//     )
//   }

//   return (
//     <HorizontalScroll 
//       title={title} 
//       seeAllLink="/products"
//       className="mb-2"           
//       innerClassName="gap-2 sm:gap-3" 
//     >
//       {products.map((product) => (
//         <div key={product.$id} className="w-[140px] sm:w-[160px] lg:w-[180px] flex-shrink-0">
//           <ProductCard product={product} />
//         </div>
//       ))}
//     </HorizontalScroll>
//   )
// }

import { HorizontalScroll } from '../../../components/common/HorizontalScroll'
import { ProductCard } from './ProductCard'
import { ProductSkeleton } from './ProductSkeleton'
import { ErrorState } from '../../../components/feedback/ErrorState'

interface FeaturedProductsProps {
  products: any[]
  isLoading?: boolean
  error?: unknown
  title?: string
}

export function FeaturedProducts({ 
  products, 
  isLoading, 
  error,
  title = "ተወዳጅ ምርቶች" 
}: FeaturedProductsProps) {

  if (isLoading) {
    return (
      <HorizontalScroll title={title}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[140px] sm:w-[160px] lg:w-[180px] flex-shrink-0">
            <ProductSkeleton />
          </div>
        ))}
      </HorizontalScroll>
    )
  }

  if (error) {
    return <ErrorState />
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        ምንም ተወዳጅ ምርቶች የሉም
      </div>
    )
  }

  return (
    <HorizontalScroll 
      title={title} 
      seeAllLink="/products"
      className="mb-2"
      innerClassName="gap-2 sm:gap-3"
    >
      {products.map((product) => (
        <div key={product.$id} className="w-[140px] sm:w-[160px] lg:w-[180px] flex-shrink-0">
          <ProductCard product={product} />
        </div>
      ))}
    </HorizontalScroll>
  )
}