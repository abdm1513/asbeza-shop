import { Client, Databases, Storage, Account, ID, Query } from 'appwrite'

const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT
const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID) {
  throw new Error('Missing Appwrite configuration. Please check your .env file.')
}

export const client = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID)

export const databases = new Databases(client)
export const storage = new Storage(client)
export const account = new Account(client)

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
export const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
export const PRODUCTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID
export const CATEGORIES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID
export const BANNERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BANNERS_COLLECTION_ID
export const CARTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_CARTS_COLLECTION_ID
export const ORDERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

export { ID, Query }

export function getImageUrl(fileId: string): string {
  if (!fileId || fileId.trim() === '') return ''
  // Direct URL to get the file view
  return `${APPWRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${APPWRITE_PROJECT_ID}`
}

export function getImageUrls(fileIds: string[] = []): string[] {
  return fileIds.map(getImageUrl).filter(url => url !== '')
}