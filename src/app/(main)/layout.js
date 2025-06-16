'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function MainLayout({ children }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: '📊',
      description: 'Overview of your business'
    },
    { 
      name: 'Billing', 
      href: '/billing', 
      icon: '🧾',
      description: 'Create and manage orders'
    },
    { 
      name: 'Inventory', 
      href: '/inventory', 
      icon: '📦',
      description: 'Manage your stock and items'
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: '📈',
      description: 'View sales and analytics'
    },
    { 
      name: 'Menu', 
      href: '/menu', 
      icon: '🍽️',
      description: 'Manage your menu items'
    },
    { 
      name: 'Staff', 
      href: '/staff', 
      icon: '👥',
      description: 'Manage staff accounts'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: '⚙️',
      description: 'System settings and preferences'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center space-x-3">
                <div className="relative h-8 w-8">
                  <Image 
                    src="/logo.png" 
                    alt="Muneem Ji Logo" 
                    fill
                    sizes="(max-width: 768px) 32px, 32px"
                    style={{ objectFit: 'contain' }}
                    priority
                    onError={(e) => {
                      console.error('Error loading logo:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xl font-semibold text-gray-900">Muneem Ji</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-orange-600 rounded-full">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm text-gray-700 transition-colors rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
} 