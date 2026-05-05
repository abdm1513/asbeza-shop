import { databases, DATABASE_ID, CATEGORIES_COLLECTION_ID, Query, getImageUrl } from '../../../lib/appwrite'
import { Category, mapDocumentToCategory } from '../types/category'

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const response = await databases.listDocuments(
      DATABASE_ID,
      CATEGORIES_COLLECTION_ID,
      [
        Query.equal('isActive', true),
        Query.orderAsc('sortOrder'),
        Query.limit(100)
      ]
    )
    
    return response.documents.map(doc => ({
      ...mapDocumentToCategory(doc),
      image: doc.image ? getImageUrl(String(doc.image)) : undefined
    }))
  }
  
  async getCategory(categoryId: string): Promise<Category> {
    const doc = await databases.getDocument(DATABASE_ID, CATEGORIES_COLLECTION_ID, categoryId)
    return {
      ...mapDocumentToCategory(doc),
      image: doc.image ? getImageUrl(String(doc.image)) : undefined
    }
  }
}

export const categoryService = new CategoryService()