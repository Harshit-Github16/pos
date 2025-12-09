'use client'

import { useState } from 'react'
import { FaBox, FaTags, FaTruck, FaExclamationTriangle } from 'react-icons/fa'
import RoleGuard from '@/components/RoleGuard'
import { useAuth } from '@/context/AuthContext'

export default function InventoryPage() {
  return (
    <RoleGuard requiredPermission="inventory">
      <InventoryContent />
    </RoleGuard>
  )
}

function InventoryContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('items')
  const [showItemForm, setShowItemForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [showSupplierForm, setShowSupplierForm] = useState(false)
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Basmati Rice',
      category: 'Rice',
      sku: 'RICE001',
      unit: 'kg',
      purchasePrice: 80,
      sellingPrice: 120,
      stock: 50,
      minStock: 10,
      description: 'Premium long grain basmati rice'
    },
    {
      id: 2,
      name: 'Chicken Breast',
      category: 'Meat',
      sku: 'MEAT001',
      unit: 'kg',
      purchasePrice: 200,
      sellingPrice: 350,
      stock: 20,
      minStock: 5,
      description: 'Fresh boneless chicken breast'
    },
    {
      id: 3,
      name: 'Paneer',
      category: 'Dairy',
      sku: 'DAIRY001',
      unit: 'kg',
      purchasePrice: 250,
      sellingPrice: 400,
      stock: 15,
      minStock: 5,
      description: 'Fresh cottage cheese'
    },
    {
      id: 4,
      name: 'Tomato',
      category: 'Vegetables',
      sku: 'VEG001',
      unit: 'kg',
      purchasePrice: 30,
      sellingPrice: 60,
      stock: 40,
      minStock: 10,
      description: 'Fresh red tomatoes'
    },
    {
      id: 5,
      name: 'Cooking Oil',
      category: 'Grocery',
      sku: 'GROC001',
      unit: 'liter',
      purchasePrice: 120,
      sellingPrice: 180,
      stock: 30,
      minStock: 10,
      description: 'Refined sunflower oil'
    },
    {
      id: 6,
      name: 'Coca Cola',
      category: 'Beverages',
      sku: 'BEV001',
      unit: 'piece',
      purchasePrice: 35,
      sellingPrice: 50,
      stock: 100,
      minStock: 20,
      description: '300ml can'
    },
    {
      id: 7,
      name: 'Masala Spices',
      category: 'Grocery',
      sku: 'SPICE001',
      unit: 'kg',
      purchasePrice: 500,
      sellingPrice: 800,
      stock: 5,
      minStock: 2,
      description: 'Mixed spices pack'
    }
  ])

  const categories = [
    { id: 'CAT001', name: 'Main Course', description: 'Curries and gravies.' },
    { id: 'CAT002', name: 'Rice', description: 'Rice-based dishes.' },
    { id: 'CAT003', name: 'Breads', description: 'Indian breads.' },
    { id: 'CAT004', name: 'Beverages', description: 'Drinks and refreshments.' },
  ]
  const suppliers = [
    { id: 'SUP001', name: 'Fresh Foods Ltd.', contact: 'Amit Verma', phone: '+91 98765 43210', email: 'amit@freshfoods.com', address: '123 Market Road, Delhi', paymentTerms: 'Net 30', taxId: 'GSTIN12345' },
    { id: 'SUP002', name: 'Dairy Best', contact: 'Sunita Rao', phone: '+91 98765 43211', email: 'sunita@dairybest.com', address: '45 Milk Lane, Mumbai', paymentTerms: 'Net 15', taxId: 'GSTIN67890' },
  ]

  const tabs = [
    { id: 'items', name: 'Items', icon: <FaBox /> },
    { id: 'categories', name: 'Categories', icon: <FaTags /> },
    { id: 'suppliers', name: 'Suppliers', icon: <FaTruck /> },
    { id: 'stock_alerts', name: 'Stock Alerts', icon: <FaExclamationTriangle /> },
  ]

  if (user?.username === 'menuuser') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have access to this page.</p>
        </div>
      </div>
    )
  }

  const AddItemForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Item</h2>
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
                <option>Food Items</option>
                <option>Beverages</option>
                <option>Snacks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900">
                <option>Piece</option>
                <option>Kilogram</option>
                <option>Liter</option>
                <option>Box</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase Price</label>
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
              <label className="block text-sm font-medium text-gray-700">Selling Price</label>
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
              <label className="block text-sm font-medium text-gray-700">Current Stock</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Stock</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                placeholder="0"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
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
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Category</h2>
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

  const AddSupplierForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Supplier</h2>
          <button
            onClick={() => setShowSupplierForm(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900">
                <option>Immediate</option>
                <option>7 Days</option>
                <option>15 Days</option>
                <option>30 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax ID</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowSupplierForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Save Supplier
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Inventory</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {activeTab === 'items' && (
            <button onClick={() => setShowItemForm(true)} className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">Add Item</button>
          )}
          {activeTab === 'categories' && (
            <button onClick={() => setShowCategoryForm(true)} className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">Add Category</button>
          )}
          {activeTab === 'suppliers' && (
            <button onClick={() => setShowSupplierForm(true)} className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">Add Supplier</button>
          )}
        </div>
      </div>
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} cursor-pointer`}>
              <span className="mr-2">{tab.icon}</span>{tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {activeTab === 'items' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">SKU</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Unit</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Purchase Price</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Min Stock</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{item.category}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{item.sku}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">{item.unit}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">₹{item.purchasePrice}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">₹{item.sellingPrice}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{item.stock}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden xl:table-cell">{item.minStock}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">{item.description}</td>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{cat.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{cat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Contact</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Address</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Payment Terms</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">Tax ID</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {suppliers.map((sup) => (
                  <tr key={sup.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{sup.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{sup.contact}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{sup.phone}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">{sup.email}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">{sup.address}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">{sup.paymentTerms}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden xl:table-cell">{sup.taxId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'stock_alerts' && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Alerts</h3>
            <ul className="list-disc pl-5 space-y-2">
              {items.filter(item => item.stock <= item.minStock).length === 0 ? (
                <li className="text-gray-500">No stock alerts. All items are sufficiently stocked.</li>
              ) : (
                items.filter(item => item.stock <= item.minStock).map(item => (
                  <li key={item.id} className="text-red-600 font-medium">{item.name} (Stock: {item.stock}) is below minimum stock ({item.minStock})</li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      {/* Forms */}
      {showItemForm && <AddItemForm />}
      {showCategoryForm && <AddCategoryForm />}
      {showSupplierForm && <AddSupplierForm />}
    </div>
  )
} 