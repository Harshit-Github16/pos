'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoleGuard({ children, requiredPermission, fallback = null }) {
  const { user, hasPermission, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      try {
        if (!user || !hasPermission(requiredPermission)) {
          // Redirect to dashboard if user doesn't have permission
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error checking permissions:', error)
        router.push('/dashboard')
      }
    }
  }, [user, loading, hasPermission, requiredPermission, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  try {
    if (!user || !hasPermission(requiredPermission)) {
      return fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  } catch (error) {
    console.error('Error in RoleGuard:', error)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600">Something went wrong. Please try again.</p>
        </div>
      </div>
    )
  }

  return children
} 