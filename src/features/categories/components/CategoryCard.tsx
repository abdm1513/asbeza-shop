// import { Link } from 'react-router-dom'
// import { OptimizedImage } from '../../../components/common/OptimizedImage'

// interface CategoryCardProps {
//   category: {
//     $id: string
//     name: string
//     image?: string
//   }
// }

// export function CategoryCard({ category }: CategoryCardProps) {
//   return (
//     <Link
//       to={`/category/${category.$id}`}
//       className="flex flex-col items-center group"
//     >
//       <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-red-500 to-blue-500 shadow-md p-2 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
//         <div className="w-full h-full rounded-full overflow-hidden ">
//           <OptimizedImage
//             src={category.image || ''}
//             alt={category.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//       <span className="mt-2 text-xs md:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors text-center">
//         {category.name}
//       </span>
//     </Link>
//   )
// }


// import { Link } from 'react-router-dom'
// import { OptimizedImage } from '../../../components/common/OptimizedImage'

// interface CategoryCardProps {
//   category: {
//     $id: string
//     name: string
//     image?: string
//   }
// }

// export function CategoryCard({ category }: CategoryCardProps) {
//   return (
//     <Link
//       to={`/category/${category.$id}`}
//       className="flex flex-col items-center group"
//     >
//       <div className="w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28 p-1 sm:p-4 rounded-full overflow-hidden shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 bg-transparent">
//         <OptimizedImage
//           src={category.image || ''}
//           alt={category.name}
//           className="w-full h-full object-contain"
//         />
//       </div>
//       <span className="mt-2 text-[10px] sm:text-base font-medium text-gray-600 group-hover:text-primary transition-colors text-center line-clamp-2 w-[60px]">
//         {category.name}
//       </span>
//     </Link>
//   )
// }

// features/categories/components/CategoryCard.tsx
import { Link } from 'react-router-dom'
import { OptimizedImage } from '../../../components/common/OptimizedImage'

interface CategoryCardProps {
  category: {
    $id: string
    name: string
    image?: string
  }
  onClick?: () => void
  isSelected?: boolean
}

export function CategoryCard({ category, onClick, isSelected }: CategoryCardProps) {
  const cardContent = (
    <div className={`flex flex-col items-center group transition-all duration-300 ${
      isSelected ? 'scale-105' : 'group-hover:scale-105'
    }`}>
      <div className={`w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28 p-1 sm:p-4 rounded-full overflow-hidden shadow-md transition-all duration-300 bg-transparent ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'group-hover:shadow-lg'
      }`}>
        <OptimizedImage
          src={category.image || ''}
          alt={category.name}
          className="w-full h-full object-contain"
        />
      </div>
      <span className={`mt-2 text-[10px] sm:text-base font-medium transition-colors text-center line-clamp-2 w-[60px] sm:w-[90px] ${
        isSelected ? 'text-primary' : 'text-gray-600 group-hover:text-primary'
      }`}>
        {category.name}
      </span>
    </div>
  );

  // If onClick is provided (for ProductsPage), use button instead of Link
  if (onClick) {
    return (
      <button onClick={onClick} className="focus:outline-none">
        {cardContent}
      </button>
    );
  }

  // Default: use Link for navigation (for HomePage)
  return (
    <Link to={`/products?category=${category.$id}`} className="block">
      {cardContent}
    </Link>
  );
}