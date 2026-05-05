// pages/HomePage.tsx
import { BannerCarousel } from '../features/banners/components/BannerCarousel'
import { Categories } from '../features/categories/components/Categories'
import { FeaturedProducts } from '../features/products/components/FeaturedProducts'
import { ProductGrid } from '../features/products/components/ProductGrid'
import { Newsletter } from '../components/common/Newsletter'

import { useBanners } from '../features/banners/hooks/useBanners'
import { useCategories } from '../features/categories/hooks/useCategories'
import { useInfiniteProducts, useFeaturedProducts } from '../features/products/hooks/useProducts'


export default function HomePage() {
  const { data: banners, isLoading: bannersLoading, error: bannersError } = useBanners()

  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories()

  const { data: featuredProducts, isLoading: featuredLoading, error: featuredError } = useFeaturedProducts()

  const { 
    data: productsData,
    isLoading: productsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: productsError
  } = useInfiniteProducts()

  const allProducts = productsData?.pages.flatMap(page => page.data) || []

  return (
    <div className="space-y-8 pb-8">

      {/* Banner */}
      <div className="container-custom pt-2 sm:pt-4">
        <BannerCarousel 
          banners={banners || []}
          isLoading={bannersLoading}
          error={bannersError}
        />
      </div>

      {/* Categories */}
      <div className="container-custom">
        <Categories 
          categories={categories || []}
          isLoading={categoriesLoading}
          error={categoriesError}
          title="ምድቦች"
        />
      </div>

      {/* Featured */}
      <div className="container-custom">
        <FeaturedProducts 
          products={featuredProducts || []}
          isLoading={featuredLoading}
          error={featuredError}
          title="ተወዳጅ ምርቶች"
        />
      </div>

      {/* Products */}
      <div className="container-custom">
        <h2 className="text-xl font-bold text-gray-800 mb-4 px-4">
          ሁሉም ምርቶች
        </h2>

        <ProductGrid 
          products={allProducts}
          isLoading={productsLoading && allProducts.length === 0}
          error={productsError}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
          isFetchingNext={isFetchingNextPage}
        />
      </div>

      {/* Newsletter */}
      <div className="container-custom">
        <Newsletter />
      </div>
    </div>
  )
}


