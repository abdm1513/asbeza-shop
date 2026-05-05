// import { AppwriteDocument } from '../../../types';

// export interface Category extends AppwriteDocument {
//   name: string;
//   sortOrder: number;
//   image?: string;
//   isActive?: boolean;
// }

// export function mapDocumentToCategory(doc: Record<string, unknown>): Category {
//   return {
//     $id: String(doc.$id || ''),
//     $createdAt: String(doc.$createdAt || ''),
//     $updatedAt: String(doc.$updatedAt || ''),
//     name: String(doc.name || ''),
//     sortOrder: Number(doc.sortOrder) || 0,
//     image: doc.image ? String(doc.image) : undefined,
//     isActive: doc.isActive !== undefined ? Boolean(doc.isActive) : true,
//   };
// }

import { AppwriteDocument } from '../../../types'

export interface Category extends AppwriteDocument {
  name: string
  sortOrder: number
  image?: string
  isActive?: boolean
}

export function mapDocumentToCategory(doc: Record<string, unknown>): Category {
  return {
    $id: String(doc.$id || ''),
    $createdAt: String(doc.$createdAt || ''),
    $updatedAt: String(doc.$updatedAt || ''),
    name: String(doc.name || ''),
    sortOrder: Number(doc.sortOrder) || 0,
    image: doc.image ? String(doc.image) : undefined,
    isActive: doc.isActive !== undefined ? Boolean(doc.isActive) : true,
  }
}