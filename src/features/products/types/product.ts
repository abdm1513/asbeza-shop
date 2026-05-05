// import { AppwriteDocument } from '../../../types'

// export interface Product extends AppwriteDocument {
//   name: string
//   price: number
//   unit: string
//   categoryId: string
//   images: string[]
//   isAvailable: boolean
//   stockQuantity: number
//   description?: string
//   sku?: string
//   isFeatured?: boolean
//   sortOrder?: number
// }

// export interface ProductFilters {
//   categoryId?: string
//   isAvailable?: boolean
//   isFeatured?: boolean
//   search?: string
// }

// // FIXED: Return Product type directly
// export function mapDocumentToProduct(doc: Record<string, unknown>): Product {
//   return {
//     $id: String(doc.$id || ''),
//     $createdAt: String(doc.$createdAt || ''),
//     $updatedAt: String(doc.$updatedAt || ''),
//     name: String(doc.name || ''),
//     price: Number(doc.price) || 0,
//     unit: String(doc.unit || 'pcs'),
//     categoryId: String(doc.categoryId || ''),
//     images: (() => {
//       const images = doc.images
//       if (!images) return []
//       if (Array.isArray(images)) return images as string[]
//       try {
//         return JSON.parse(images as string)
//       } catch {
//         return []
//       }
//     })(),
//     isAvailable: Boolean(doc.isAvailable),
//     stockQuantity: Number(doc.stockQuantity) || 0,
//     description: doc.description ? String(doc.description) : undefined,
//     sku: doc.sku ? String(doc.sku) : undefined,
//     isFeatured: doc.isFeatured ? Boolean(doc.isFeatured) : false,
//     sortOrder: Number(doc.sortOrder) || 0,
//   }
// }

import { AppwriteDocument } from '../../../types'

export interface Product extends AppwriteDocument {
  name: string
  price: number
  unit: string
  categoryId: string
  images: string[]
  isAvailable: boolean
  stockQuantity: number
  description?: string
  sku?: string
  isFeatured?: boolean
  sortOrder?: number
}

export interface ProductFilters {
  categoryId?: string
  isAvailable?: boolean
  isFeatured?: boolean
  search?: string
}

export function mapDocumentToProduct(doc: Record<string, unknown>): Product {
  // Parse images - handle both array and JSON string
  let images: string[] = []
  const rawImages = doc.images
  if (rawImages) {
    if (Array.isArray(rawImages)) {
      images = rawImages as string[]
    } else if (typeof rawImages === 'string') {
      try {
        images = JSON.parse(rawImages)
      } catch {
        images = []
      }
    }
  }
  
  return {
    $id: String(doc.$id || ''),
    $createdAt: String(doc.$createdAt || ''),
    $updatedAt: String(doc.$updatedAt || ''),
    name: String(doc.name || ''),
    price: Number(doc.price) || 0,
    unit: String(doc.unit || 'pcs'),
    categoryId: String(doc.categoryId || ''),
    images: images,
    isAvailable: doc.isAvailable === true || doc.isAvailable === 'true',
    stockQuantity: Number(doc.stockQuantity) || 0,
    description: doc.description ? String(doc.description) : undefined,
    sku: doc.sku ? String(doc.sku) : undefined,
    isFeatured: doc.isFeatured === true || doc.isFeatured === 'true',
    sortOrder: Number(doc.sortOrder) || 0,
  }
}