import { AppwriteDocument } from '../../../types'

export interface Banner extends AppwriteDocument {
  image: string
  isActive: boolean
  sortOrder: number
  title?: string
  subtitle?: string
  link?: string
}

export function mapDocumentToBanner(doc: Record<string, unknown>): Banner {
  return {
    $id: String(doc.$id || ''),
    $createdAt: String(doc.$createdAt || ''),
    $updatedAt: String(doc.$updatedAt || ''),
    image: String(doc.image || ''),
    isActive: Boolean(doc.isActive),
    sortOrder: Number(doc.sortOrder) || 0,
    title: doc.title ? String(doc.title) : undefined,
    subtitle: doc.subtitle ? String(doc.subtitle) : undefined,
    link: doc.link ? String(doc.link) : undefined,
  }
}