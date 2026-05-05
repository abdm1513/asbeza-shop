import { databases, DATABASE_ID, ORDERS_COLLECTION_ID, Query, ID } from '../../../lib/appwrite'
import { Order, CreateOrderInput, mapDocumentToOrder, generateOrderId } from '../types/order'

class OrderService {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const orderId = generateOrderId()
    
    const doc = await databases.createDocument(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      ID.unique(),
      {
        orderId,
        userId: input.userId,
        userName: input.userName,
        userPhone: input.userPhone,
        items: JSON.stringify(input.items),
        subTotal: input.subTotal,
        deliveryFee: input.deliveryFee,
        total: input.total,
        orderStatus: 'pending',
        orderType: input.orderType,
        deliveryAddress: input.deliveryAddress,
        paymentMethod: 'cod',
        deliveryTime: input.deliveryTime,
        scheduledTime: input.scheduledTime || null,
        notes: input.notes || null,
      }
    )
    
    return mapDocumentToOrder(doc)
  }
  
  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await databases.listDocuments(
      DATABASE_ID,
      ORDERS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.orderDesc('$createdAt')
      ]
    )
    
    return response.documents.map(mapDocumentToOrder)
  }
  
  async getOrder(orderId: string): Promise<Order | null> {
    try {
      const doc = await databases.getDocument(DATABASE_ID, ORDERS_COLLECTION_ID, orderId)
      return mapDocumentToOrder(doc)
    } catch {
      return null
    }
  }
  
  async cancelOrder(orderId: string): Promise<boolean> {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        ORDERS_COLLECTION_ID,
        orderId,
        { orderStatus: 'cancelled' }
      )
      return true
    } catch {
      return false
    }
  }
}

export const orderService = new OrderService()