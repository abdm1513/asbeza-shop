import { account, databases, DATABASE_ID, ID, USERS_COLLECTION_ID } from '../../../lib/appwrite'
import { User, mapDocumentToUser } from '../types/auth'

// Helper functions
const cleanPhoneForEmail = (phone: string): string => {
  return phone.replace(/\D/g, '')
}

const formatDisplayPhone = (phone: string): string => {
  if (phone.startsWith('+')) return phone
  if (phone.startsWith('0')) return `+251${phone.substring(1)}`
  if (phone.startsWith('251')) return `+${phone}`
  return `+251${phone}`
}

class AuthService {
  private async deleteExistingSessions(): Promise<void> {
    try {
      await account.deleteSession('current')
    } catch (e) {
      // No session to delete
    }
  }

  async login(phone: string, password: string): Promise<User> {
    try {
      await this.deleteExistingSessions()
      
      const cleanPhone = cleanPhoneForEmail(phone)
      const email = `${cleanPhone}@grocery-app.com`
      
      await account.createEmailPasswordSession(email, password)
      
      const currentUser = await this.getCurrentUser()
      if (!currentUser) throw new Error('User not found')
      return currentUser
    } catch (error: any) {
      if (error.code === 401) {
        throw new Error('ስልክ ቁጥር ወይም የይለፍ ቃል ትክክል አይደለም')
      }
      throw error
    }
  }

  async register(phone: string, password: string, name: string, address?: string): Promise<User> {
    try {
      await this.deleteExistingSessions()
      
      const displayPhone = formatDisplayPhone(phone)
      const cleanPhone = cleanPhoneForEmail(phone)
      const email = `${cleanPhone}@grocery-app.com`
      
      // Create account
      const accountData = await account.create(ID.unique(), email, password, name)
      
      // Create user document
      const userDoc = await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
          phone: displayPhone,
          name,
          address: address || '',
          accountId: accountData.$id,
          email
        }
      )
      
      // Wait a moment for the account to be ready
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create session
      await account.createEmailPasswordSession(email, password)
      
      return mapDocumentToUser(userDoc)
    } catch (error: any) {
      if (error.code === 409) {
        throw new Error('ይህ ስልክ ቁጥር ቀድሞ ተመዝግቧል')
      }
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await account.deleteSession('current')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const accountData = await account.get()
      const cleanPhone = accountData.email?.replace('@grocery-app.com', '')
      const displayPhone = formatDisplayPhone(cleanPhone || '')
      
      const users = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID, [])
      const userDoc = users.documents.find(doc => 
        doc.phone === displayPhone || 
        doc.accountId === accountData.$id ||
        doc.email === accountData.email
      )
      
      return userDoc ? mapDocumentToUser(userDoc) : null
    } catch {
      return null
    }
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    const updatedDoc = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      userId,
      data
    )
    return mapDocumentToUser(updatedDoc)
  }

  async sendPasswordReset(phone: string): Promise<void> {
    const cleanPhone = cleanPhoneForEmail(phone)
    const email = `${cleanPhone}@grocery-app.com`
    await account.createRecovery(email, `${window.location.origin}/reset-password`)
  }
}

export const authService = new AuthService()