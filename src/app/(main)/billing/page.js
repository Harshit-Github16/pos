'use client'

import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import RoleGuard from '@/components/RoleGuard'

// Dummy data for order history
const orderHistory = [
  {
    id: 'ORD004',
    customer: 'Neha Singh',
    items: [
      { name: 'Chicken Biryani', quantity: 2, price: '₹600' },
      { name: 'Coke', quantity: 2, price: '₹100' },
    ],
    total: '₹800',
    status: 'Completed',
    time: '1:45 PM',
    date: '2024-02-20',
    payment: 'Card',
  },
  {
    id: 'ORD005',
    customer: 'Vikram Mehta',
    items: [
      { name: 'Veg Thali', quantity: 1, price: '₹250' },
      { name: 'Masala Dosa', quantity: 1, price: '₹180' },
      { name: 'Masala Chai', quantity: 2, price: '₹60' },
    ],
    total: '₹550',
    status: 'Completed',
    time: '1:30 PM',
    date: '2024-02-20',
    payment: 'Cash',
  },
  {
    id: 'ORD006',
    customer: 'Rajesh Kumar',
    items: [
      { name: 'Butter Chicken', quantity: 1, price: '₹450' },
      { name: 'Butter Naan', quantity: 2, price: '₹100' },
      { name: 'Lassi', quantity: 1, price: '₹80' },
    ],
    total: '₹710',
    status: 'Completed',
    time: '1:15 PM',
    date: '2024-02-20',
    payment: 'UPI',
  },
]

export default function BillingPage() {
  return (
    <RoleGuard requiredPermission="billing">
      <BillingContent />
    </RoleGuard>
  )
}

function BillingContent() {
  const [activeTab, setActiveTab] = useState('new_order')
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showBillPreview, setShowBillPreview] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const billRef = useRef(null)
  const [editOrder, setEditOrder] = useState(null)
  const [showEditOrderForm, setShowEditOrderForm] = useState(false)
  const [orders, setOrders] = useState(orderHistory)
  const { user } = require('@/context/AuthContext').useAuth();
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

  // Business information for the bill
  const businessInfo = {
    name: 'Muneem Ji Restaurant',
    address: '123 Main Street, Delhi, India',
    phone: '+91 98765 43210',
    email: 'info@muneemji.com',
    gstin: 'GSTIN12345',
    website: 'www.muneemji.com'
  }

  const generatePDF = async (order) => {
    if (!billRef.current) return

    setIsGeneratingPDF(true)
    try {
      const canvas = await html2canvas(billRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Generate filename with order ID and timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      const filename = `Bill_${order.id}_${timestamp}.pdf`
      
      pdf.save(filename)
      setShowBillPreview(false)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const BillPreview = ({ order }) => {
    if (!order) return null

    const currentDate = new Date().toLocaleDateString('en-IN')
    const currentTime = new Date().toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })

    // Calculate tax and totals
    const subtotal = order.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''))
      return sum + (price * item.quantity)
    }, 0)
    
    const cgst = subtotal * 0.025 // 2.5% CGST
    const sgst = subtotal * 0.025 // 2.5% SGST
    const serviceCharge = subtotal * 0.05 // 5% Service Charge
    const total = subtotal + cgst + sgst + serviceCharge

    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Bill Preview</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowBillPreview(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => generatePDF(order)}
                  disabled={isGeneratingPDF}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                </button>
              </div>
            </div>

            {/* Bill Content */}
            <div ref={billRef} className="bg-white p-6 border border-gray-200 rounded-lg">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessInfo.name}</h1>
                <p className="text-sm text-gray-600 mb-1">{businessInfo.address}</p>
                <p className="text-sm text-gray-600 mb-1">Phone: {businessInfo.phone}</p>
                <p className="text-sm text-gray-600 mb-1">Email: {businessInfo.email}</p>
                <p className="text-sm text-gray-600 mb-1">GSTIN: {businessInfo.gstin}</p>
                <p className="text-sm text-gray-600">{businessInfo.website}</p>
              </div>

              {/* Bill Details */}
              <div className="border-t border-b border-gray-300 py-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900">Bill No:</p>
                    <p className="text-gray-700">{order.id}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Date:</p>
                    <p className="text-gray-700">{currentDate}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Time:</p>
                    <p className="text-gray-700">{currentTime}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Table:</p>
                    <p className="text-gray-700">{order.table}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-900">Customer:</p>
                    <p className="text-gray-700">{order.customer}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 font-semibold text-gray-900">Item</th>
                      <th className="text-center py-2 font-semibold text-gray-900">Qty</th>
                      <th className="text-right py-2 font-semibold text-gray-900">Rate</th>
                      <th className="text-right py-2 font-semibold text-gray-900">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => {
                      const price = parseFloat(item.price.replace('₹', '').replace(',', ''))
                      const amount = price * item.quantity
                      return (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2 text-gray-900">{item.name}</td>
                          <td className="py-2 text-center text-gray-700">{item.quantity}</td>
                          <td className="py-2 text-right text-gray-700">₹{price.toFixed(2)}</td>
                          <td className="py-2 text-right text-gray-900">₹{amount.toFixed(2)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-300 pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-gray-900">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">CGST (2.5%):</span>
                    <span className="text-gray-900">₹{cgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">SGST (2.5%):</span>
                    <span className="text-gray-900">₹{sgst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Service Charge (5%):</span>
                    <span className="text-gray-900">₹{serviceCharge.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
                    <span className="text-gray-900">Total:</span>
                    <span className="text-gray-900">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-sm text-gray-600">
                <p className="mb-2">Thank you for dining with us!</p>
                <p className="mb-2">Please visit again</p>
                <p>This is a computer generated bill</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'new_order', name: 'New Order', icon: '🛍️' },
    { id: 'active_orders', name: 'Active Orders', icon: '⏳' },
    { id: 'order_history', name: 'Order History', icon: '📋' },
    { id: 'customers', name: 'Customers', icon: '👥' },
  ]

  // Dummy data for active orders
  const activeOrders = [
    {
      id: 'ORD001',
      customer: 'Rahul Sharma',
      items: [
        { name: 'Butter Chicken', quantity: 2, price: '₹450' },
        { name: 'Naan', quantity: 4, price: '₹200' },
        { name: 'Cold Drink', quantity: 2, price: '₹100' },
      ],
      total: '₹1,400',
      status: 'Preparing',
      time: '2:30 PM',
      table: 'T12',
    },
    {
      id: 'ORD002',
      customer: 'Priya Patel',
      items: [
        { name: 'Veg Biryani', quantity: 1, price: '₹250' },
        { name: 'Raita', quantity: 1, price: '₹50' },
        { name: 'Masala Chai', quantity: 2, price: '₹60' },
      ],
      total: '₹420',
      status: 'Ready',
      time: '2:15 PM',
      table: 'T08',
    },
    {
      id: 'ORD003',
      customer: 'Amit Kumar',
      items: [
        { name: 'Paneer Butter Masala', quantity: 1, price: '₹350' },
        { name: 'Butter Naan', quantity: 2, price: '₹100' },
        { name: 'Lassi', quantity: 1, price: '₹80' },
      ],
      total: '₹610',
      status: 'Served',
      time: '2:00 PM',
      table: 'T05',
    },
  ]

  // Dummy data for customers
  const customers = [
    {
      id: 'CUST001',
      name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      email: 'rahul.sharma@email.com',
      type: 'Regular',
      totalOrders: 25,
      totalSpent: '₹28,500',
      lastOrder: '2024-02-20',
    },
    {
      id: 'CUST002',
      name: 'Priya Patel',
      phone: '+91 98765 43211',
      email: 'priya.patel@email.com',
      type: 'Regular',
      totalOrders: 18,
      totalSpent: '₹22,000',
      lastOrder: '2024-02-20',
    },
    {
      id: 'CUST003',
      name: 'Amit Kumar',
      phone: '+91 98765 43212',
      email: 'amit.kumar@email.com',
      type: 'Occasional',
      totalOrders: 8,
      totalSpent: '₹9,500',
      lastOrder: '2024-02-20',
    },
  ]

  // Dummy data for menu items
  const menuItems = [
    {
      category: 'Main Course',
      items: [
        { name: 'Butter Chicken', price: '₹450', available: true },
        { name: 'Paneer Butter Masala', price: '₹350', available: true },
        { name: 'Veg Biryani', price: '₹250', available: true },
        { name: 'Chicken Biryani', price: '₹300', available: true },
      ],
    },
    {
      category: 'Breads',
      items: [
        { name: 'Butter Naan', price: '₹50', available: true },
        { name: 'Garlic Naan', price: '₹60', available: true },
        { name: 'Tandoori Roti', price: '₹40', available: true },
      ],
    },
    {
      category: 'Beverages',
      items: [
        { name: 'Masala Chai', price: '₹30', available: true },
        { name: 'Cold Drink', price: '₹50', available: true },
        { name: 'Lassi', price: '₹80', available: true },
      ],
    },
  ]

  const AddCustomerForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Type</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900">
              <option>Regular</option>
              <option>Occasional</option>
              <option>New</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
              rows="2"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowCustomerForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Save Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const PaymentForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Complete Payment</h3>
        <div className="mb-4">
          <p className="text-sm text-gray-500">Order Total</p>
          <p className="text-2xl font-semibold text-gray-900">{selectedOrder?.total}</p>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900">
              <option>Cash</option>
              <option>Card</option>
              <option>UPI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount Received</label>
            <input
              type="number"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Change</label>
            <input
              type="number"
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-900"
              value="0"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowPaymentForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Complete Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const handleEditOrder = (order) => {
    setEditOrder(order)
    setShowEditOrderForm(true)
  }

  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  const EditOrderForm = () => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Order</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
              value={editOrder?.customer || ''}
              onChange={e => setEditOrder({ ...editOrder, customer: e.target.value })}
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setShowEditOrderForm(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={() => {
              setOrders(orders.map(o => o.id === editOrder.id ? editOrder : o))
              setShowEditOrderForm(false)
            }} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Billing</h1>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {activeTab === 'customers' && (
            <button
              onClick={() => setShowCustomerForm(true)}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
            >
              Add Customer
            </button>
          )}
          {activeTab === 'new_order' && (
            <button
              onClick={() => setShowCustomerForm(true)}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
            >
              New Order
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      <div className="space-y-4 sm:space-y-6">
        {activeTab === 'new_order' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Menu Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {menuItems.map((category) => (
                <div key={category.category} className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">{category.category}</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {category.items.map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-orange-500 cursor-pointer transition-colors"
                        >
                          <div>
                            <p className="font-medium text-gray-900 text-sm sm:text-base">{item.name}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{item.price}</p>
                          </div>
                          <button className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-orange-600 hover:text-orange-700">
                            Add
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Order Summary</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Table Number</span>
                    <input
                      type="text"
                      className="w-20 sm:w-24 px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm"
                      placeholder="T01"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Customer</span>
                    <select className="w-32 sm:w-40 px-2 py-1 border border-gray-300 rounded-md text-gray-900 text-sm">
                      <option>Walk-in Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-gray-900">₹0.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax (5%)</span>
                        <span className="text-gray-900">₹0.00</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">₹0.00</span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'active_orders' && (
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Order {order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {order.customer} • Table {order.table} • {order.time}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full w-fit ${
                        order.status === 'Ready'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Preparing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-gray-900">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-gray-900">{item.price}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span className="text-gray-900">Total</span>
                        <span className="text-gray-900">{order.total}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                    {order.status === 'Ready' && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowPaymentForm(true)
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
                      >
                        Complete Payment
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                        Mark as Ready
                      </button>
                    )}
                    {order.status === 'Served' && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order)
                          setShowBillPreview(true)
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
                      >
                        Generate Bill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'order_history' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Items
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Date & Time
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Payment
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                        {order.items.map((item) => `${item.quantity}x ${item.name}`).join(', ')}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                        {order.total}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                        {order.date} {order.time}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                        {order.payment}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium space-x-2">
                        <button onClick={() => handleEditOrder(order)} className="text-blue-600 hover:text-blue-900">Edit</button>
                        <button onClick={() => handleDeleteOrder(order.id)} className="text-red-600 hover:text-red-900">Delete</button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowBillPreview(true)
                          }}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          Generate Bill
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Orders
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Total Spent
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Last Order
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">{customer.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <div className="text-xs sm:text-sm text-gray-900">{customer.phone}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{customer.email}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            customer.type === 'Regular'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {customer.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden sm:table-cell">
                        {customer.totalOrders}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">
                        {customer.totalSpent}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">
                        {customer.lastOrder}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <button className="text-orange-600 hover:text-orange-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showCustomerForm && <AddCustomerForm />}
      {showPaymentForm && <PaymentForm />}
      {showBillPreview && <BillPreview order={selectedOrder} />}
      {showEditOrderForm && <EditOrderForm />}
    </div>
  )
} 