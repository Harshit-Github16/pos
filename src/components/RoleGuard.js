'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RoleGuard({ children, requiredPermission }) {
  const { user, hasPermission, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login')
      } else if (requiredPermission && !hasPermission(requiredPermission)) {
        router.push('/login')
      }
    }
  }, [user, loading, router, requiredPermission, hasPermission])

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  // If not authenticated or no permission, don't render children (redirecting...)
  if (!user || (requiredPermission && !hasPermission(requiredPermission))) {
    return null
  }

  // User has permission, render the children
  return children
} 