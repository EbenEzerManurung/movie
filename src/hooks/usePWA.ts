// src/hooks/usePWA.ts
import { useState, useEffect } from 'react'

interface PWAInstallPrompt {
  show: boolean
  install: () => Promise<void>
  dismiss: () => void
}

export const usePWAInstall = (): PWAInstallPrompt => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handleInstallReady = (e: any) => {
      setDeferredPrompt(e.detail.deferredPrompt)
      setShowPrompt(true)
    }

    window.addEventListener('pwa-install-ready', handleInstallReady)

    return () => {
      window.removeEventListener('pwa-install-ready', handleInstallReady)
    }
  }, [])

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        console.log('✅ PWA installed successfully')
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    }
  }

  const dismiss = () => {
    setShowPrompt(false)
  }

  return {
    show: showPrompt,
    install,
    dismiss,
  }
}

export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}

export const useSWUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    const handleUpdate = () => setUpdateAvailable(true)
    window.addEventListener('sw-update-available', handleUpdate)

    return () => {
      window.removeEventListener('sw-update-available', handleUpdate)
    }
  }, [])

  const reload = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      })
    }
  }

  return { updateAvailable, reload }
}