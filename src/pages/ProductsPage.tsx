// pages/ProductsPage.tsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCategories } from '../features/categories/hooks/useCategories'
import { useProducts } from '../features/products/hooks/useProducts'
import { Categories } from '../features/categories/components/Categories'
import { ProductGrid } from '../features/products/components/ProductGrid'
import { PageLoader } from '../components/feedback/PageLoader'
import { ErrorState } from '../components/feedback/ErrorState'
import { EmptyState } from '../components/feedback/EmptyState'
import { Input } from '../components/ui/Input'
import { Search, X } from 'lucide-react'
import { useDebounce } from '../hooks/useDebounce'
import { useOffline } from '../contexts/OfflineContext'
import { OfflineState } from '../components/feedback/OfflineState'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || undefined
  const searchFromUrl = searchParams.get('search') || ''
  
  const [searchQuery, setSearchQuery] = useState(searchFromUrl)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory)
  const debouncedSearch = useDebounce(searchQuery, 500)
  
  const { isOffline, pendingActions } = useOffline()
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories()
  
  const filters = {
    categoryId: selectedCategory,
    ...(debouncedSearch?.trim() ? { search: debouncedSearch.trim() } : {})
  }

  const {
    data: productsData,
    isLoading: productsLoading,
    // error: productsError,
    refetch,
    isFetching,
  } = useProducts(filters)

  useEffect(() => {
    setSearchQuery(searchFromUrl)
  }, [searchFromUrl])

  // Update URL when filters change
  useEffect(() => {
    const params: { category?: string; search?: string } = {}
    if (selectedCategory) params.category = selectedCategory
    if (debouncedSearch.trim()) {
      params.search = debouncedSearch
    }
    setSearchParams(params)
  }, [selectedCategory, debouncedSearch, setSearchParams])

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? undefined : categoryId)
    if (searchQuery) {
      setSearchQuery('')
    }
  }

  const clearFilters = () => {
    setSelectedCategory(undefined)
    setSearchQuery('')
  }

  const activeCategories = categories?.filter(c => c.isActive !== false) || []
  const products = productsData?.data || []
  const selectedCategoryName = activeCategories.find(c => c.$id === selectedCategory)?.name

  // Show loading state
  if (categoriesLoading ) {
    return <PageLoader />
  }

  if (categoriesError && !isOffline && !categories?.length) {
    return (
      <div className="container-custom py-12">
        <ErrorState onRetry={() => refetch()} />
      </div>
    )
  }

  // Show offline state when offline and no categories
  if (isOffline && !activeCategories.length && !categoriesLoading) {
    return (
      <div className="container-custom py-12">
        <OfflineState 
          hasCachedData={false}
          pendingActions={pendingActions.length}
          onRetry={() => window.location.reload()}
        />
      </div>
    )
  }

  return (
    <div className="container-custom py-6 sm:py-8 space-y-8">
      {/* Offline banner */}
      {isOffline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-sm text-yellow-700">
            ⚠️ ከኢንተርኔት ጋር አልተገናኘም። ከማህደር የተወሰደ ውሂብ እያዩ ነው።
          </p>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ምርቶች</h1>
        <p className="text-gray-500 mt-1">ሁሉንም ምርቶች በምድብ ወይም በፍለጋ ይመልከቱ</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="ምርት ፈልግ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={isOffline}
          className={`pl-10 pr-10 ${isOffline ? 'bg-gray-50' : ''}`}
        />
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Categories Section - Using the updated Categories component */}
      <Categories 
        categories={categories || []}
        isLoading={categoriesLoading}
        error={categoriesError}
        title="ምድቦች"
        selectedCategoryId={selectedCategory}
        onCategorySelect={handleCategorySelect}
        interactive={true}
      />

      {/* Active Filters */}
      {(selectedCategory || searchQuery) && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600">ንቁ ማጣሪያዎች:</span>
          {selectedCategory && selectedCategoryName && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              {selectedCategoryName}
              <button onClick={() => setSelectedCategory(undefined)} className="hover:text-primary-dark">
                <X size={14} />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary rounded-lg text-sm">
              ፍለጋ: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="hover:text-primary-dark">
                <X size={14} />
              </button>
            </span>
          )}
          {(selectedCategory || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-600 ml-2"
            >
              ሁሉንም አጽዳ
            </button>
          )}
        </div>
      )}

      {/* Loading indicator for search */}
      {(debouncedSearch && (productsLoading || isFetching)) && (
        <div className="text-sm text-gray-500">
          “{debouncedSearch}” በመፈለግ ላይ...
        </div>
      )}

      {/* Products Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {selectedCategoryName || (searchQuery ? `"${searchQuery}" ውጤቶች` : 'ሁሉም ምርቶች')}
          </h2>
          <span className="text-sm text-gray-500">
            {products.length} ምርቶች ተገኝተዋል
          </span>
        </div>
        
        {productsLoading && products.length === 0 ? (
          <ProductGrid products={[]} isLoading={true} />
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState 
            type="search"
            action={{
              label: "ማጣሪያዎችን አጽዳ",
              onClick: clearFilters
            }}
          />
        )}
      </div>
    </div>
  )
}