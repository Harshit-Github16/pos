'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function MainLayout({ children }) {
  const { user, logout, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const allNavigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: '📊',
      description: 'Overview of your business',
      permission: 'dashboard'
    },
    { 
      name: 'Billing', 
      href: '/billing', 
      icon: '🧾',
      description: 'Create and manage orders',
      permission: 'billing'
    },
    { 
      name: 'Inventory', 
      href: '/inventory', 
      icon: '📦',
      description: 'Manage your stock and items',
      permission: 'inventory'
    },
    { 
      name: 'Reports', 
      href: '/reports', 
      icon: '📈',
      description: 'View sales and analytics',
      permission: 'reports'
    },
    { 
      name: 'Menu', 
      href: '/menu', 
      icon: '🍽️',
      description: 'Manage your menu items',
      permission: 'menu'
    },
    { 
      name: 'Staff', 
      href: '/staff', 
      icon: '👥',
      description: 'Manage staff accounts',
      permission: 'staff'
    },
    { 
      name: 'Settings', 
      href: '/settings', 
      icon: '⚙️',
      description: 'System settings and preferences',
      permission: 'settings'
    },
  ]

  // Filter navigation based on user permissions
  const navigation = allNavigation.filter(item => {
    try {
      return hasPermission(item.permission)
    } catch (error) {
      console.error('Error checking permission for navigation item:', item.name, error)
      return false
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 ">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <Link href="/dashboard" className="flex items-center space-x-3 ml-2 lg:ml-0 group">
                <div className="relative h-10 w-10 bg-gradient-to-br  rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  <Image 
                    src="/logo.png" 
                    alt="Muneem Ji Logo" 
                    fill
                    sizes="(max-width: 768px) 40px, 40px"
                    style={{ objectFit: 'contain' }}
                    priority
                    className="p-1.5"
                    onError={(e) => {
                      console.error('Error loading logo:', e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 hidden sm:block bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Muneem Ji
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:block">Restaurant POS</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center justify-center w-10 h-10 text-sm font-semibold text-white bg-gradient-to-br from-orange-500 to-orange-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ring-2 ring-orange-100">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</span>
                </div>
              </div>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className={`fixed top-16 mt-5 left-0 z-40 h-[calc(100vh-4rem)] bg-white/95 backdrop-blur-md border-r border-gray-200/60 shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:inset-0 w-72`}>
        <div className="h-full px-4 py-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Navigation
            </h2>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 transition-all duration-200 ${
                    isActive 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                  }`}>
                    <span className="text-base">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5 hidden lg:block opacity-75">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="w-1 h-6 bg-orange-500 rounded-full ml-2"></div>
                  )}
                </Link>
              )
            })}
          </nav>
          
          {/* Footer section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className=" pt-16 min-h-screen w-full">
        <div className="p-6 sm:p-8 max-w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 min-h-[calc(100vh-8rem)]">
            <div className="p-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 