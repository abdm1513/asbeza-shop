// import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, Query, getImageUrls } from '../../../lib/appwrite'
// import { Product, ProductFilters, mapDocumentToProduct } from '../types/product'
// import { PaginatedResponse } from '../../../types'

// class ProductService {
//   async getProducts(filters?: ProductFilters, limit: number = 20, offset: number = 0): Promise<PaginatedResponse<Product>> {
//     try {
//       const queries = [Query.limit(limit), Query.offset(offset)]
      
//       if (filters?.categoryId) {
//         queries.push(Query.equal('categoryId', filters.categoryId))
//       }
      
//       if (filters?.isAvailable !== undefined) {
//         queries.push(Query.equal('isAvailable', filters.isAvailable))
//       }
      
//       if (filters?.isFeatured !== undefined) {
//         queries.push(Query.equal('isFeatured', filters.isFeatured))
//       }
      
//       if (filters?.search && filters.search.trim()) {
//         queries.push(Query.search('name', filters.search))
//       }
      
//       queries.push(Query.orderDesc('$createdAt'))
      
//       console.log('Fetching products with queries:', queries)
      
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         PRODUCTS_COLLECTION_ID,
//         queries
//       )
      
//       console.log('Products response:', response)
      
//       const products = response.documents.map(doc => {
//         const mapped = mapDocumentToProduct(doc)
//         return {
//           ...mapped,
//           images: getImageUrls(mapped.images)
//         }
//       })
      
//       return {
//         data: products,
//         total: response.total,
//         limit,
//         offset
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       throw error
//     }
//   }
  
//   async getProduct(productId: string): Promise<Product> {
//     try {
//       const doc = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, productId)
//       const mapped = mapDocumentToProduct(doc)
//       return {
//         ...mapped,
//         images: getImageUrls(mapped.images)
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error)
//       throw error
//     }
//   }
  
//   async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
//     try {
//       console.log('Fetching featured products...')
      
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         PRODUCTS_COLLECTION_ID,
//         [
//           Query.equal('isFeatured', true),
//           Query.equal('isAvailable', true),
//           Query.limit(limit)
//         ]
//       )
      
//       console.log('Featured products response:', response)
      
//       const products = response.documents.map(doc => {
//         const mapped = mapDocumentToProduct(doc)
//         return {
//           ...mapped,
//           images: getImageUrls(mapped.images)
//         }
//       })
      
//       return products
//     } catch (error) {
//       console.error('Error fetching featured products:', error)
//       return []
//     }
//   }
  
//   async getProductsByCategory(categoryId: string, limit: number = 20): Promise<Product[]> {
//     try {
//       const response = await databases.listDocuments(
//         DATABASE_ID,
//         PRODUCTS_COLLECTION_ID,
//         [
//           Query.equal('categoryId', categoryId),
//           Query.equal('isAvailable', true),
//           Query.limit(limit)
//         ]
//       )
      
//       return response.documents.map(doc => {
//         const mapped = mapDocumentToProduct(doc)
//         return {
//           ...mapped,
//           images: getImageUrls(mapped.images)
//         }
//       })
//     } catch (error) {
//       console.error('Error fetching products by category:', error)
//       return []
//     }
//   }
// }

// export const productService = new ProductService()

import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, Query, getImageUrls } from '../../../lib/appwrite'
import { Product, ProductFilters, mapDocumentToProduct } from '../types/product'
import { PaginatedResponse } from '../../../types'

class ProductService {
  async getProducts(filters?: ProductFilters, limit: number = 20, offset: number = 0): Promise<PaginatedResponse<Product>> {
    try {
      const queries = [Query.limit(limit), Query.offset(offset)]
      
      if (filters?.categoryId) {
        queries.push(Query.equal('categoryId', filters.categoryId))
      }
      
      if (filters?.isAvailable !== undefined) {
        queries.push(Query.equal('isAvailable', filters.isAvailable))
      }
      
      if (filters?.isFeatured !== undefined) {
        queries.push(Query.equal('isFeatured', filters.isFeatured))
      }
      
     if (filters?.search && filters.search.trim()) {
        const searchTerm = filters.search.trim()
        queries.push(Query.search('name', searchTerm))
      }
      
      queries.push(Query.orderDesc('$createdAt'))
      
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        queries
      )
      
      let products = response.documents.map(doc => {
        const mapped = mapDocumentToProduct(doc)
        return {
          ...mapped,
          images: getImageUrls(mapped.images)
        }
      })

      if (filters?.search && filters.search.trim()) {
        const q = filters.search.toLowerCase()

        products = products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
        )
      }
      
      return {
        data: products,
        total: response.total,
        limit,
        offset
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      return { data: [], total: 0, limit, offset }
    }
  }
  
  async getProduct(productId: string): Promise<Product | null> {
    try {
      const doc = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, productId)
      const mapped = mapDocumentToProduct(doc)
      return {
        ...mapped,
        images: getImageUrls(mapped.images)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  }
  
  async getFeaturedProducts(limit: number = 10): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Query.equal('isFeatured', true),
          Query.equal('isAvailable', true),
          Query.limit(limit)
        ]
      )
      
      return response.documents.map(doc => {
        const mapped = mapDocumentToProduct(doc)
        return {
          ...mapped,
          images: getImageUrls(mapped.images)
        }
      })
    } catch (error) {
      console.error('Error fetching featured products:', error)
      return []
    }
  }
  
  async getProductsByCategory(categoryId: string, limit: number = 20): Promise<Product[]> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Query.equal('categoryId', categoryId),
          Query.equal('isAvailable', true),
          Query.limit(limit)
        ]
      )
      
      return response.documents.map(doc => {
        const mapped = mapDocumentToProduct(doc)
        return {
          ...mapped,
          images: getImageUrls(mapped.images)
        }
      })
    } catch (error) {
      console.error('Error fetching products by category:', error)
      return []
    }
  }
}

export const productService = new ProductService()