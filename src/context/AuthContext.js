'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('muneem_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username, password) => {
    // Demo login credentials
    if (username === 'harshit123' && password === '12345678') {
      const demoUser = {
        id: 1,
        username: 'harshit123',
        role: 'owner',
        name: 'Harshit'
      }
      setUser(demoUser)
      localStorage.setItem('muneem_user', JSON.stringify(demoUser))
      // Set cookie for middleware
      document.cookie = `muneem_user=${JSON.stringify(demoUser)}; path=/`
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('muneem_user')
    // Remove cookie on logout
    document.cookie = 'muneem_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 