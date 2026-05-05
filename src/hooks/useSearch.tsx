import { useState, useEffect, useCallback } from 'react'
import { useDebounce } from './useDebounce'

interface UseSearchOptions<T> {
  items: T[]
  searchFields: (keyof T)[]
  delay?: number
  initialQuery?: string
}

export function useSearch<T>({ items, searchFields, delay = 300, initialQuery = '' }: UseSearchOptions<T>) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<T[]>(items)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedQuery = useDebounce(query, delay)

  const search = useCallback((searchQuery: string, searchItems: T[]) => {
    if (!searchQuery.trim()) return searchItems
    
    const lowerQuery = searchQuery.toLowerCase()
    return searchItems.filter(item =>
      searchFields.some(field => {
        const value = item[field]
        return value && String(value).toLowerCase().includes(lowerQuery)
      })
    )
  }, [searchFields])

  useEffect(() => {
    setIsSearching(true)
    const filtered = search(debouncedQuery, items)
    setResults(filtered)
    setIsSearching(false)
  }, [debouncedQuery, items, search])

  const clearSearch = () => setQuery('')

  return {
    query,
    setQuery,
    results,
    isSearching,
    clearSearch,
    hasResults: results.length > 0,
    totalResults: results.length
  }
}

export function useProductSearch(products: any[]) {
  return useSearch({
    items: products,
    searchFields: ['name', 'description'],
    delay: 300
  })
}