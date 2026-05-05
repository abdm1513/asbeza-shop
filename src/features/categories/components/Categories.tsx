// import { HorizontalScroll } from '../../../components/common/HorizontalScroll'
// import { CategoryCard } from './CategoryCard'
// import { Skeleton } from '../../../components/ui/Skeleton'

// interface CategoriesProps {
//   categories: any[]
//   isLoading?: boolean
//   title?: string
// }

// export function Categories({ categories, isLoading, title = "ምድቦች" }: CategoriesProps) {
//   if (isLoading) {
//     return (
//       <HorizontalScroll title={title}>
//         {Array.from({ length: 8 }).map((_, i) => (
//           <div key={i} className="flex flex-col items-center w-24 flex-shrink-0">
//             <Skeleton variant="circular" width="96px" height="96px" />
//             <Skeleton width="60px" height="16px" className="mt-2" />
//           </div>
//         ))}
//       </HorizontalScroll>
//     )
//   }

//   const activeCategories = categories.filter(c => c.isActive !== false)

//   if (activeCategories.length === 0) return null

//  return (
//     <HorizontalScroll 
//       title={title}
//       className="mb-0"          
//       innerClassName="gap-5 sm:gap-12" 
//     >
//       {activeCategories.map((category) => (
//         <div key={category.$id} className="flex-shrink-0">
//           <CategoryCard category={category} />
//         </div>
//       ))}
//     </HorizontalScroll>
//   )
// }

// import { HorizontalScroll } from '../../../components/common/HorizontalScroll'
// import { CategoryCard } from './CategoryCard'
// import { Skeleton } from '../../../components/ui/Skeleton'
// import { ErrorState } from '../../../components/feedback/ErrorState'

// interface CategoriesProps {
//   categories: any[]
//   isLoading?: boolean
//   error?: unknown
//   title?: string
// }

// export function Categories({ 
//   categories, 
//   isLoading, 
//   error,
//   title = "ምድቦች" 
// }: CategoriesProps) {

//   if (isLoading) {
//     return (
//       <HorizontalScroll title={title}>
//         {Array.from({ length: 8 }).map((_, i) => (
//           <div key={i} className="flex flex-col items-center w-24 flex-shrink-0">
//             <Skeleton variant="circular" width="96px" height="96px" />
//             <Skeleton width="60px" height="16px" className="mt-2" />
//           </div>
//         ))}
//       </HorizontalScroll>
//     )
//   }

//   if (error) {
//     return <ErrorState />
//   }

//   const activeCategories = categories.filter(c => c.isActive !== false)

//   if (activeCategories.length === 0) {
//     return (
//       <div className="text-center py-8 text-gray-500">
//         ምንም ምድቦች አልተገኙም
//       </div>
//     )
//   }

//   return (
//     <HorizontalScroll title={title} className="mb-0" innerClassName="gap-5 sm:gap-12">
//       {activeCategories.map((category) => (
//         <div key={category.$id} className="flex-shrink-0">
//           <CategoryCard category={category} />
//         </div>
//       ))}
//     </HorizontalScroll>
//   )
// }

// features/categories/components/Categories.tsx
import { HorizontalScroll } from '../../../components/common/HorizontalScroll'
import { CategoryCard } from './CategoryCard'
import { Skeleton } from '../../../components/ui/Skeleton'
import { ErrorState } from '../../../components/feedback/ErrorState'
import { OfflineState } from '../../../components/feedback/OfflineState'
import { useOffline } from '../../../contexts/OfflineContext'

interface CategoriesProps {
  categories: any[]
  isLoading?: boolean
  error?: unknown
  title?: string
  selectedCategoryId?: string
  onCategorySelect?: (categoryId: string) => void
  interactive?: boolean // For ProductsPage where categories are interactive
}

export function Categories({ 
  categories, 
  isLoading, 
  error,
  title = "ምድቦች",
  selectedCategoryId,
  onCategorySelect,
  interactive = false
}: CategoriesProps) {
  const { isOffline } = useOffline();

  if (isLoading) {
    return (
      <HorizontalScroll title={title}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center w-24 flex-shrink-0">
            <Skeleton variant="circular" width="96px" height="96px" />
            <Skeleton width="60px" height="16px" className="mt-2" />
          </div>
        ))}
      </HorizontalScroll>
    )
  }

  if (error && !isOffline) {
    return <ErrorState onRetry={() => window.location.reload()} />
  }

  const activeCategories = categories?.filter(c => c.isActive !== false) || []

  if (activeCategories.length === 0) {
    if (isOffline) {
      return (
        <OfflineState 
          hasCachedData={false}
          onRetry={() => window.location.reload()}
        />
      )
    }
    return (
      <div className="text-center py-8 text-gray-500">
        ምንም ምድቦች አልተገኙም
      </div>
    )
  }

  return (
    <HorizontalScroll title={title} className="mb-0" innerClassName="gap-5 sm:gap-12">
      {activeCategories.map((category) => (
        <div key={category.$id} className="flex-shrink-0">
          <CategoryCard 
            category={category}
            onClick={interactive && onCategorySelect ? () => onCategorySelect(category.$id) : undefined}
            isSelected={selectedCategoryId === category.$id}
          />
        </div>
      ))}
    </HorizontalScroll>
  )
}