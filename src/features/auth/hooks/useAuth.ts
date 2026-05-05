import { useCallback } from 'react'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import { useCartStore } from '../../cart/store/cartStore'
import toast from 'react-hot-toast'
import { User } from '../types/auth'

export function useAuth() {
  const { user, isLoading, error, isAuthenticated, setUser, setLoading, setError, logout: logoutStore } = useAuthStore()
  const clearCart = useCartStore((state) => state.clearCart)

  const login = useCallback(async (phone: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const user = await authService.login(phone, password)
      setUser(user)
      toast.success('እንኳን ደህና መጡ!')
      return user
    } catch (err: any) {
      const message = err.message || 'የሆነ ስህተት ተከስቷል'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setUser])

  const register = useCallback(async (phone: string, password: string, name: string, address?: string) => {
    setLoading(true)
    setError(null)
    try {
      const user = await authService.register(phone, password, name, address)
      setUser(user)
      toast.success('መለያ በተሳካ ሁኔታ ተፈጥሯል!')
      return user
    } catch (err: any) {
      const message = err.message || 'የሆነ ስህተት ተከስቷል'
      setError(message)
      toast.error(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setUser])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await authService.logout()
      logoutStore()
      clearCart()
      toast.success('በሰላም ውጥተሃል')
      window.location.href = '/'
    } catch (err) {
      toast.error('የሆነ ስህተት ተከስቷል')
    } finally {
      setLoading(false)
    }
  }, [setLoading, logoutStore, clearCart])

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    setLoading(true)
    try {
      const updatedUser = await authService.updateUserProfile(user.$id, data)
      setUser(updatedUser)
      toast.success('መገለጫ ተዘምኗል')
      return updatedUser
    } catch (err) {
      toast.error('ማዘመን አልተሳካም')
      throw err
    } finally {
      setLoading(false)
    }
  }, [user, setLoading, setUser])

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
  }
}