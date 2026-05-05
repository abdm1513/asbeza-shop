import { AppwriteDocument } from '../../../types'

export interface User extends AppwriteDocument {
  phone: string
  name: string
  address?: string
  email?: string
  accountId?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

export interface LoginCredentials {
  phone: string
  password: string
}

export interface RegisterData {
  phone: string
  password: string
  name: string
  address?: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (phone: string, password: string) => Promise<void>
  register: (phone: string, password: string, name?: string, address?: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

export function mapDocumentToUser(doc: Record<string, unknown>): User {
  return {
    $id: String(doc.$id || ''),
    $createdAt: String(doc.$createdAt || ''),
    $updatedAt: String(doc.$updatedAt || ''),
    phone: String(doc.phone || ''),
    name: String(doc.name || ''),
    address: doc.address ? String(doc.address) : undefined,
    email: doc.email ? String(doc.email) : undefined,
    accountId: doc.accountId ? String(doc.accountId) : undefined,
  }
}