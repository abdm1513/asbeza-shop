// components/layout/Layout.tsx
import { useEffect, useRef } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { CartFloatingButton } from './CartFloatingButton'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import toast from 'react-hot-toast'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const isOnline = useOnlineStatus()
  const wasOfflineRef = useRef(false)

  useEffect(() => {
    // Only show toast when transitioning from online to offline
    if (!isOnline && !wasOfflineRef.current) {
      toast.error('እባክዎ የኢንተርኔት ግንኙነትዎን ያረጋግጡ', {
        duration: 4000,
        icon: '📡',
        id: 'offline-toast', 
      })
      wasOfflineRef.current = true
    } else if (isOnline && wasOfflineRef.current) {
      toast.success('ኢንተርኔት ተመልሷል!', {
        duration: 3000,
        icon: '✅',
        id: 'online-toast',
      })
      wasOfflineRef.current = false
    }
  }, [isOnline])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CartFloatingButton />
    </div>
  )
}