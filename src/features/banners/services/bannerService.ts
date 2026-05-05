import { databases, DATABASE_ID, BANNERS_COLLECTION_ID, Query, getImageUrl } from '../../../lib/appwrite'
import { Banner, mapDocumentToBanner } from '../types/banner'

class BannerService {
  async getActiveBanners(): Promise<Banner[]> {
    const response = await databases.listDocuments(
      DATABASE_ID,
      BANNERS_COLLECTION_ID,
      [
        Query.equal('isActive', true),
        Query.orderAsc('sortOrder'),
        Query.limit(10)
      ]
    )
    
    return response.documents.map(doc => ({
      ...mapDocumentToBanner(doc),
      image: getImageUrl(String(doc.image))
    }))
  }
}

export const bannerService = new BannerService()