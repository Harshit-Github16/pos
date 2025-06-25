'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState({})

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const defaultUsers = {
          'harshit123': {
            id: 1,
            username: 'harshit123',
            password: '12345678',
            role: 'admin',
            name: 'Harshit',
            permissions: ['dashboard', 'billing', 'inventory', 'reports', 'menu', 'staff', 'settings']
          },
          'receptionist': {
            id: 2,
            username: 'receptionist',
            password: '12345678',
            role: 'receptionist',
            name: 'Priya',
            permissions: ['dashboard', 'billing',]
          },
          'menuuser': {
            id: 3,
            username: 'menuuser',
            password: '12345678',
            role: 'user',
            name: 'Menu User',
            permissions: ['menu']
          }
        };
        
        const storedUser = localStorage.getItem('muneem_user')
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser({ ...parsedUser, permissions: parsedUser.permissions || [] })
        }
        
        const storedUsers = localStorage.getItem('muneem_users')
        let finalUsers = { ...defaultUsers }
        if (storedUsers) {
          const parsedStoredUsers = JSON.parse(storedUsers)
          finalUsers = { ...defaultUsers, ...parsedStoredUsers }
        }
        
        setAllUsers(finalUsers)
        localStorage.setItem('muneem_users', JSON.stringify(finalUsers))

      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username, password) => {
    const user = allUsers[username]
    
    if (user && user.password === password) {
      const { password: _, ...userWithoutPassword } = user
      
      // Ensure permissions array exists
      const userWithPermissions = {
        ...userWithoutPassword,
        permissions: userWithoutPassword.permissions || []
      }
      
      setUser(userWithPermissions)
      localStorage.setItem('muneem_user', JSON.stringify(userWithPermissions))
      // Set cookie for middleware
      document.cookie = `muneem_user=${JSON.stringify(userWithPermissions)}; path=/`
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

  const hasPermission = (permission) => {
    if (!user) return false
    if (!user.permissions || !Array.isArray(user.permissions)) return false
    return user.permissions.includes(permission)
  }

  const addReceptionist = (receptionistData) => {
    const newReceptionist = {
      id: Date.now(),
      username: receptionistData.username,
      password: receptionistData.password,
      role: 'receptionist',
      name: receptionistData.name,
      email: receptionistData.email,
      phone: receptionistData.phone,
      permissions: ['dashboard', 'billing', 'menu', 'inventory', 'reports', 'staff', 'settings']
    }

    const updatedUsers = {
      ...allUsers,
      [receptionistData.username]: newReceptionist
    }

    setAllUsers(updatedUsers)
    localStorage.setItem('muneem_users', JSON.stringify(updatedUsers))
    
    return { success: true, message: 'Receptionist added successfully' }
  }

  const getAllReceptionists = () => {
    return Object.values(allUsers).filter(user => user.role === 'receptionist')
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      hasPermission, 
      addReceptionist, 
      getAllReceptionists 
    }}>
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