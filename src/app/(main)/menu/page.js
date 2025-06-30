'use client'

import { useState } from 'react'
import RoleGuard from '@/components/RoleGuard'
import { useAuth } from '@/context/AuthContext'
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import Image from 'next/image'

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
  )
}

function DeleteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
  )
}

const DEMO_CATEGORIES = [
  {
    id: 'pizza',
    name: 'Pizza',
    image: '/pizza.jpeg',
    items: [
      { id: 'p1', name: 'Margherita', description: 'Classic cheese & tomato', price: 299, image: '/pizza.jpeg' },
      { id: 'p2', name: 'Farmhouse', description: 'Veggies & cheese', price: 399, image: '/pizza.jpeg' },
      { id: 'p3', name: 'Peppy Paneer', description: 'Spicy paneer & capsicum', price: 349, image: '/pizza.jpeg' },
    ],
  },
  {
    id: 'drinks',
    name: 'Drinks',
    image: '/drinks.jpg',
    items: [
      { id: 'd1', name: 'Red Cooler', description: 'Chilled berry drink', price: 129, image: '/drinks.jpg' },
      { id: 'd2', name: 'Iced Tea', description: 'Refreshing lemon iced tea', price: 99, image: '/drinks.jpg' },
      { id: 'd3', name: 'Lassi', description: 'Cool yogurt drink', price: 79, image: '/drinks.jpg' },
    ],
  },
  {
    id: 'dessert',
    name: 'Dessert',
    image: '/dessert.jpg',
    items: [
      { id: 'a3', name: 'Cookie Skillet', description: 'Warm cookie with ice cream', price: 249, image: '/dessert.jpg' },
      { id: 'a2', name: 'Choco Lava Cake', description: 'Rich chocolate cake', price: 129, image: '/dessert.jpg' },
      { id: 'a1', name: 'Choco Lava Cake', description: 'Rich chocolate cake', price: 199, image: '/dessert.jpg' },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    image: '/drinks.jpg',
    items: [
        { id: 's1', name: 'Club Sandwich', description: 'Loaded with veggies and ham', price: 249, image: '/sandwich.jpeg' },
        { id: 's3', name: 'Club Sandwich', description: 'Loaded with veggies and ham', price: 149, image: '/sandwich.jpeg' },
        { id: 's2', name: 'Veggie Delight', description: 'Fresh vegetable sandwich', price: 179, image: '/sandwich.jpeg' },
    ]
  },
  {
    id: 'paratha',
    name: 'Paratha',
    image: '/drinks.jpg',
    items: [
        { id: 'pr1', name: 'Aloo Paratha', description: 'With butter and pickle', price: 149, image: '/paratha.jpeg' },
        { id: 'pr2', name: 'Gobi Paratha', description: 'With curd and chutney', price: 159, image: '/paratha.jpeg' },
        { id: 'pr3', name: 'Gobi Paratha', description: 'With curd and chutney', price: 199, image: '/paratha.jpeg' },
    ]
  },
    {
    id: 'biryani',
    name: 'Biryani',
    image: '/pizza.jpeg',
    items: [
        { id: 'b1', name: 'Chicken Dum Biryani', description: 'Aromatic and flavorful', price: 349, image: '/biryani.jpeg' },
        { id: 'b2', name: 'Veg Biryani', description: 'Mixed vegetable biryani', price: 279, image: '/biryani.jpeg' },
        { id: 'b3', name: 'Veg Biryani', description: 'Mixed vegetable biryani', price: 479, image: '/biryani.jpeg' },
    ]
  },
]

function MenuUserPage() {
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id)
      if (found) {
        return prev.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      } else {
        return [...prev, { ...item, qty: 1 }]
      }
    })
  }

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId))
  }

  const updateQty = (itemId, qty) => {
    setCart((prev) => prev.map((i) => (i.id === itemId ? { ...i, qty: Math.max(0, qty) } : i)).filter(i => i.qty > 0))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className=" mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Menu Categories & Items */}
          <div className="lg:col-span-2 space-y-10">
            {DEMO_CATEGORIES.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center mb-6">
                  <Image src={cat.image} alt={cat.name} width={48} height={48} className="rounded-full object-cover mr-4 border-2 border-white shadow-md" />
                  <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{cat.name}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {cat.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-1 transition-all duration-300">
                      <Image src={cat.image} alt={item.name} width={400} height={160} className="w-full h-40 object-cover" />
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-3 h-10">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-2xl text-orange-600 font-bold">₹{item.price}</div>
                          <button onClick={() => addToCart(item)} className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-md">
                            <FiPlus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Cart */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 sticky top-8 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <FiShoppingCart className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl font-bold text-gray-800">Your Order</h2>
            </div>
            {cart.length === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <FiShoppingCart className="w-16 h-16 mx-auto mb-4" />
                <p>Your cart is empty</p>
                <p className="text-sm">Add items to get started!</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 rounded-lg border object-cover" />
                      <div className="flex-1 ml-4">
                        <div className="font-semibold text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">₹{item.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                          {item.qty === 1 ? <FiTrash2 className="w-4 h-4 text-red-500" /> : <FiMinus className="w-4 h-4 text-gray-600" />}
                        </button>
                        <span className="w-8 text-center font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                          <FiPlus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t-2 border-dashed pt-5 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Charges</span>
                    <span>₹{(total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span>₹{(total * 1.05).toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-orange-300">
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const { user } = useAuth()
  if (user?.username === 'menuuser') {
    return <MenuUserPage />
  }
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

  const [categories, setCategories] = useState([
    { id: 'C001', name: 'Main Course', description: 'Curries and gravies.', displayOrder: 1 },
    { id: 'C002', name: 'Rice', description: 'Rice-based dishes.', displayOrder: 2 },
    { id: 'C003', name: 'Breads', description: 'Indian breads.', displayOrder: 3 },
    { id: 'C004', name: 'Beverages', description: 'Drinks and refreshments.', displayOrder: 4 },
  ])
  const [combos, setCombos] = useState([
    { id: 'CB001', name: 'Lunch Combo', items: ['Butter Chicken', 'Butter Naan', 'Masala Chai'], price: 500, description: 'Perfect lunch for one.' },
    { id: 'CB002', name: 'Veg Combo', items: ['Paneer Butter Masala', 'Veg Biryani', 'Butter Naan'], price: 400, description: 'Vegetarian delight.' },
  ])
  const [modifiers, setModifiers] = useState([
    { id: 'MOD001', name: 'Extra Spicy', description: 'Add more spice.' },
    { id: 'MOD002', name: 'No Onion', description: 'Remove onion.' },
    { id: 'MOD003', name: 'Extra Cheese', description: 'Add cheese.' },
  ])

  const tabs = [
    { id: 'menu_items', name: 'Menu Items', icon: '🍽️' },
    { id: 'categories', name: 'Categories', icon: '🗂️' },
    { id: 'combos', name: 'Combos', icon: '🥡' },
    { id: 'modifiers', name: 'Modifiers', icon: '🧂' },
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
      <div className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Menu Item</h2>
          <button
            onClick={() => setShowEditMenuItemForm(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => {
          e.preventDefault()
          setMenuList(menuList.map(i => i.id === editMenuItem.id ? editMenuItem : i))
          setShowEditMenuItemForm(false)
        }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Item Name</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                value={editMenuItem?.name || ''}
                onChange={e => setEditMenuItem({ ...editMenuItem, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                value={editMenuItem?.category || ''}
                onChange={e => setEditMenuItem({ ...editMenuItem, category: e.target.value })}
              >
                <option>Select Category</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
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
                  value={editMenuItem?.price || ''}
                  onChange={e => setEditMenuItem({ ...editMenuItem, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                placeholder="e.g. 20 min"
                value={editMenuItem?.prepTime || ''}
                onChange={e => setEditMenuItem({ ...editMenuItem, prepTime: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
                value={editMenuItem?.description || ''}
                onChange={e => setEditMenuItem({ ...editMenuItem, description: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2 grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center">
                  <input
                    id="available"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={editMenuItem?.available || false}
                    onChange={e => setEditMenuItem({ ...editMenuItem, available: e.target.checked })}
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
                    Available
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="online"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={editMenuItem?.online || false}
                    onChange={e => setEditMenuItem({ ...editMenuItem, online: e.target.checked })}
                  />
                  <label htmlFor="online" className="ml-2 block text-sm text-gray-700">
                    Online
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="dineIn"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={editMenuItem?.dineIn || false}
                    onChange={e => setEditMenuItem({ ...editMenuItem, dineIn: e.target.checked })}
                  />
                  <label htmlFor="dineIn" className="ml-2 block text-sm text-gray-700">
                    Dine-in
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowEditMenuItemForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Save Changes
            </button>
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
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === tab.id ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} cursor-pointer`}>
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
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      {(user?.role === 'admin' || user?.role === 'receptionist') && (
                        <div className="flex items-center space-x-2">
                          <button onClick={() => handleEditMenuItem(item)} className="text-gray-500 hover:text-blue-600 p-1">
                            <EditIcon />
                          </button>
                          <button onClick={() => handleDeleteMenuItem(item.id)} className="text-gray-500 hover:text-red-600 p-1">
                            <DeleteIcon />
                          </button>
                        </div>
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{cat.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{cat.description}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{cat.displayOrder}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      {(user?.role === 'admin' || user?.role === 'receptionist') && (
                        <div className="flex items-center space-x-2">
                          <button onClick={() => alert('Edit action for category: ' + cat.name)} className="text-gray-500 hover:text-blue-600 p-1">
                            <EditIcon />
                          </button>
                          <button onClick={() => setCategories(prev => prev.filter(c => c.id !== cat.id))} className="text-gray-500 hover:text-red-600 p-1">
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </td>
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {combos.map((combo) => (
                  <tr key={combo.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{combo.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{combo.items.join(', ')}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">₹{combo.price}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{combo.description}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      {(user?.role === 'admin' || user?.role === 'receptionist') && (
                        <div className="flex items-center space-x-2">
                          <button onClick={() => alert('Edit action for combo: ' + combo.name)} className="text-gray-500 hover:text-blue-600 p-1">
                            <EditIcon />
                          </button>
                          <button onClick={() => setCombos(prev => prev.filter(c => c.id !== combo.id))} className="text-gray-500 hover:text-red-600 p-1">
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </td>
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {modifiers.map((mod) => (
                  <tr key={mod.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{mod.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">{mod.description}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      {(user?.role === 'admin' || user?.role === 'receptionist') && (
                        <div className="flex items-center space-x-2">
                          <button onClick={() => alert('Edit action for modifier: ' + mod.name)} className="text-gray-500 hover:text-blue-600 p-1">
                            <EditIcon />
                          </button>
                          <button onClick={() => setModifiers(prev => prev.filter(m => m.id !== mod.id))} className="text-gray-500 hover:text-red-600 p-1">
                            <DeleteIcon />
                          </button>
                        </div>
                      )}
                    </td>
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