'use client'

import { useState } from 'react'
import RoleGuard from '@/components/RoleGuard'
import { useAuth } from '@/context/AuthContext'

export default function MenuPage() {
  return (
    <RoleGuard requiredPermission="menu">
      <MenuContent />
    </RoleGuard>
  )
}

function MenuContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('menu_items')
  const [showItemForm, setShowItemForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editMenuItem, setEditMenuItem] = useState(null)
  const [showEditMenuItemForm, setShowEditMenuItemForm] = useState(false)
  const [menuList, setMenuList] = useState([
    { id: 'M001', name: 'Butter Chicken', category: 'Main Course', price: 450, prepTime: '20 min', available: true, online: true, dineIn: true, description: 'Rich creamy chicken curry.' },
    { id: 'M002', name: 'Paneer Butter Masala', category: 'Main Course', price: 350, prepTime: '18 min', available: true, online: true, dineIn: true, description: 'Paneer in buttery tomato gravy.' },
    { id: 'M003', name: 'Veg Biryani', category: 'Rice', price: 250, prepTime: '15 min', available: true, online: false, dineIn: true, description: 'Aromatic rice with veggies.' },
    { id: 'M004', name: 'Butter Naan', category: 'Breads', price: 50, prepTime: '5 min', available: true, online: true, dineIn: true, description: 'Soft naan with butter.' },
    { id: 'M005', name: 'Masala Chai', category: 'Beverages', price: 30, prepTime: '3 min', available: true, online: false, dineIn: true, description: 'Spiced Indian tea.' },
  ])

  const tabs = [
    { id: 'menu_items', name: 'Menu Items', icon: '🍽️' },
    { id: 'categories', name: 'Categories', icon: '🗂️' },
    { id: 'combos', name: 'Combos', icon: '🥡' },
    { id: 'modifiers', name: 'Modifiers', icon: '🧂' },
  ]

  const categories = [
    { id: 'C001', name: 'Main Course', description: 'Curries and gravies.', displayOrder: 1 },
    { id: 'C002', name: 'Rice', description: 'Rice-based dishes.', displayOrder: 2 },
    { id: 'C003', name: 'Breads', description: 'Indian breads.', displayOrder: 3 },
    { id: 'C004', name: 'Beverages', description: 'Drinks and refreshments.', displayOrder: 4 },
  ]
  const combos = [
    { id: 'CB001', name: 'Lunch Combo', items: ['Butter Chicken', 'Butter Naan', 'Masala Chai'], price: 500, description: 'Perfect lunch for one.' },
    { id: 'CB002', name: 'Veg Combo', items: ['Paneer Butter Masala', 'Veg Biryani', 'Butter Naan'], price: 400, description: 'Vegetarian delight.' },
  ]
  const modifiers = [
    { id: 'MOD001', name: 'Extra Spicy', description: 'Add more spice.' },
    { id: 'MOD002', name: 'No Onion', description: 'Remove onion.' },
    { id: 'MOD003', name: 'Extra Cheese', description: 'Add cheese.' },
  ]

  const handleEditMenuItem = (item) => {
    setEditMenuItem(item)
    setShowEditMenuItemForm(true)
  }

  const handleDeleteMenuItem = (itemId) => {
    setMenuList((prev) => prev.filter((i) => i.id !== itemId))
  }

  const AddMenuItemForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add Menu Item</h2>
          <button
            onClick={() => setShowItemForm(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900">
                <option>Select Category</option>
                <option>Main Course</option>
                <option>Appetizers</option>
                <option>Beverages</option>
                <option>Desserts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  className="block w-full pl-7 pr-12 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                placeholder="Minutes"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Ingredients</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                placeholder="Enter ingredients separated by commas"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Available for Online Ordering
                </label>
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Available for Dine-in
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowItemForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const AddCategoryForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add Category</h2>
          <button
            onClick={() => setShowCategoryForm(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Order</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              placeholder="Enter display order (1, 2, 3...)"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowCategoryForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const EditMenuItemForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Menu Item</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              value={editMenuItem?.name || ''}
              onChange={e => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setShowEditMenuItemForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={() => {
              setMenuList(menuList.map(i => i.id === editMenuItem.id ? editMenuItem : i))
              setShowEditMenuItemForm(false)
            }} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Menu</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {activeTab === 'menu_items' && (user?.role === 'admin' || user?.role === 'receptionist') && (
            <button onClick={() => setShowItemForm(true)} className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">Add Menu Item</button>
          )}
          {activeTab === 'categories' && (user?.role === 'admin' || user?.role === 'receptionist') && (
            <button onClick={() => setShowCategoryForm(true)} className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">Add Category</button>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <span className="mr-2">{tab.icon}</span>{tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {activeTab === 'menu_items' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Prep Time</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Available</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Online</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Dine-In</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Description</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {menuList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{item.category}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">₹{item.price}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{item.prepTime}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">{item.available ? 'Yes' : 'No'}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">{item.online ? 'Yes' : 'No'}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">{item.dineIn ? 'Yes' : 'No'}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">{item.description}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium space-x-2">
                      {(user?.role === 'admin' || user?.role === 'receptionist') && (
                        <>
                          <button onClick={() => handleEditMenuItem(item)} className="text-blue-600 hover:text-blue-900">Edit</button>
                          <button onClick={() => handleDeleteMenuItem(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display Order</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{cat.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{cat.description}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{cat.displayOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'combos' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Combo</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Items</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {combos.map((combo) => (
                  <tr key={combo.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{combo.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{combo.items.join(', ')}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">₹{combo.price}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{combo.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'modifiers' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modifier</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modifiers.map((mod) => (
                  <tr key={mod.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{mod.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{mod.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Forms */}
      {showItemForm && (user?.role === 'admin' || user?.role === 'receptionist') && <AddMenuItemForm />}
      {showCategoryForm && (user?.role === 'admin' || user?.role === 'receptionist') && <AddCategoryForm />}
      {showEditMenuItemForm && (user?.role === 'admin' || user?.role === 'receptionist') && <EditMenuItemForm />}
    </div>
  )
} 