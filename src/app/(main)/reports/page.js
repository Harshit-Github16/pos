'use client'

import { useState, useRef } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid } from 'recharts'
import RoleGuard from '@/components/RoleGuard'
import { useAuth } from '@/context/AuthContext'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function ReportsPage() {
  return (
    <RoleGuard requiredPermission="reports">
      <ReportsContent />
    </RoleGuard>
  )
}

function ReportsContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('sales')
  const [dateRange, setDateRange] = useState('today')
  const reportContentRef = useRef(null)

  const handleExport = () => {
    if (reportContentRef.current) {
      const reportName = tabs.find(t => t.id === activeTab)?.name || 'Report'
      const fileName = `${reportName.replace(/ /g, '_')}_${dateRange}_${new Date().toISOString().split('T')[0]}.pdf`

      html2canvas(reportContentRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
        pdf.save(fileName)
      });
    }
  }

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

  const tabs = [
    { id: 'sales', name: 'Sales Reports', icon: '💰' },
    { id: 'inventory', name: 'Inventory Reports', icon: '📦' },
    { id: 'customer', name: 'Customer Reports', icon: '👥' },
    { id: 'staff', name: 'Staff Reports', icon: '👨‍🍳' },
  ]

  const dateRanges = [
    { id: 'today', name: 'Today' },
    { id: 'yesterday', name: 'Yesterday' },
    { id: 'this_week', name: 'This Week' },
    { id: 'last_week', name: 'Last Week' },
    { id: 'this_month', name: 'This Month' },
    { id: 'last_month', name: 'Last Month' },
    { id: 'custom', name: 'Custom Range' },
  ]

  // Dummy data for sales summary
  const salesSummary = {
    totalSales: '₹45,250',
    totalOrders: '156',
    averageOrderValue: '₹290',
    totalCustomers: '89',
    topSellingItems: [
      { name: 'Butter Chicken', quantity: 45, revenue: '₹13,500' },
      { name: 'Veg Biryani', quantity: 38, revenue: '₹9,500' },
      { name: 'Masala Dosa', quantity: 32, revenue: '₹6,400' },
      { name: 'Paneer Butter Masala', quantity: 28, revenue: '₹7,000' },
      { name: 'Cold Drink', quantity: 65, revenue: '₹3,250' },
    ],
    recentOrders: [
      { id: 'ORD001', customer: 'Rahul Sharma', amount: '₹850', status: 'Completed', time: '2:30 PM' },
      { id: 'ORD002', customer: 'Priya Patel', amount: '₹1,250', status: 'Completed', time: '2:15 PM' },
      { id: 'ORD003', customer: 'Amit Kumar', amount: '₹650', status: 'Completed', time: '2:00 PM' },
      { id: 'ORD004', customer: 'Neha Singh', amount: '₹1,500', status: 'Processing', time: '1:45 PM' },
      { id: 'ORD005', customer: 'Vikram Mehta', amount: '₹950', status: 'Processing', time: '1:30 PM' },
    ],
    weeklySales: [
      { day: 'Mon', sales: 42000 },
      { day: 'Tue', sales: 45000 },
      { day: 'Wed', sales: 48000 },
      { day: 'Thu', sales: 51000 },
      { day: 'Fri', sales: 55000 },
      { day: 'Sat', sales: 62000 },
      { day: 'Sun', sales: 58000 },
    ],
  }

  // Dummy data for inventory summary
  const inventorySummary = {
    totalItems: '245',
    lowStockItems: '12',
    outOfStockItems: '3',
    totalValue: '₹2,45,000',
    categoryBreakdown: [
      { category: 'Raw Materials', items: 85, value: '₹1,20,000' },
      { category: 'Packaged Goods', items: 95, value: '₹85,000' },
      { category: 'Beverages', items: 45, value: '₹25,000' },
      { category: 'Spices', items: 20, value: '₹15,000' },
    ],
    lowStockAlerts: [
      { item: 'Basmati Rice', currentStock: 5, minStock: 10, lastOrdered: '2024-02-15' },
      { item: 'Paneer', currentStock: 3, minStock: 8, lastOrdered: '2024-02-18' },
      { item: 'Butter', currentStock: 4, minStock: 12, lastOrdered: '2024-02-16' },
      { item: 'Cooking Oil', currentStock: 2, minStock: 15, lastOrdered: '2024-02-14' },
    ],
    recentStockMovements: [
      { item: 'Chicken', type: 'Received', quantity: 50, date: '2024-02-20', time: '9:00 AM' },
      { item: 'Vegetables', type: 'Received', quantity: 100, date: '2024-02-20', time: '8:30 AM' },
      { item: 'Paneer', type: 'Issued', quantity: 15, date: '2024-02-20', time: '11:00 AM' },
      { item: 'Rice', type: 'Issued', quantity: 25, date: '2024-02-20', time: '10:30 AM' },
    ],
  }

  // Dummy data for customer summary
  const customerSummary = {
    totalCustomers: '1,245',
    newCustomers: '45',
    returningCustomers: '89',
    averageOrderValue: '₹850',
    customerSegments: [
      { segment: 'Regular', count: 450, percentage: 36 },
      { segment: 'Occasional', count: 520, percentage: 42 },
      { segment: 'New', count: 275, percentage: 22 },
    ],
    topCustomers: [
      { name: 'Rahul Sharma', orders: 25, totalSpent: '₹28,500', lastOrder: '2024-02-19' },
      { name: 'Priya Patel', orders: 18, totalSpent: '₹22,000', lastOrder: '2024-02-18' },
      { name: 'Amit Kumar', orders: 15, totalSpent: '₹18,500', lastOrder: '2024-02-17' },
      { name: 'Neha Singh', orders: 12, totalSpent: '₹15,000', lastOrder: '2024-02-16' },
    ],
    customerFeedback: [
      { rating: 5, count: 85, percentage: 65 },
      { rating: 4, count: 35, percentage: 27 },
      { rating: 3, count: 8, percentage: 6 },
      { rating: 2, count: 2, percentage: 1.5 },
      { rating: 1, count: 1, percentage: 0.5 },
    ],
  }

  // Dummy data for staff summary
  const staffSummary = {
    totalStaff: '15',
    presentToday: '12',
    onLeave: '2',
    absent: '1',
    staffPerformance: [
      { name: 'John Doe', role: 'Manager', ordersHandled: 45, sales: '₹45,000', rating: 4.8 },
      { name: 'Sarah Johnson', role: 'Cashier', ordersHandled: 38, sales: '₹38,000', rating: 4.6 },
      { name: 'Rahul Kumar', role: 'Kitchen Staff', ordersHandled: 42, sales: '₹42,000', rating: 4.7 },
    ],
    attendanceSummary: [
      { date: '2024-02-20', present: 12, absent: 1, onLeave: 2 },
      { date: '2024-02-19', present: 13, absent: 1, onLeave: 1 },
      { date: '2024-02-18', present: 14, absent: 0, onLeave: 1 },
    ],
    shiftPerformance: [
      { shift: 'Morning', staff: 5, orders: 45, sales: '₹45,000' },
      { shift: 'Evening', staff: 4, orders: 38, sales: '₹38,000' },
      { shift: 'Night', staff: 2, orders: 15, sales: '₹15,000' },
    ],
  }

  const COLORS = ['#f97316', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6'];

  return (
    <div className="space-y-6">
      <div className='lg:flex lg:justify-between'>
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-gray-900"
          >
            {dateRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
      
        </div>
        
      </div>
    
      <div className='mt-3'>
      <button onClick={handleExport} className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
            Export Report
      </button>
      </div>


      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } cursor-pointer`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      <div ref={reportContentRef} className="space-y-6">
        {activeTab === 'sales' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{salesSummary.totalSales}</p>
                <p className="mt-1 text-sm text-green-600">↑ 12% from yesterday</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{salesSummary.totalOrders}</p>
                <p className="mt-1 text-sm text-green-600">↑ 8% from yesterday</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{salesSummary.averageOrderValue}</p>
                <p className="mt-1 text-sm text-green-600">↑ 5% from yesterday</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{salesSummary.totalCustomers}</p>
                <p className="mt-1 text-sm text-green-600">↑ 15% from yesterday</p>
              </div>
            </div>

            {/* Weekly Sales Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Sales</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesSummary.weeklySales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#f97316" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Selling Items Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Items</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesSummary.topSellingItems} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#34d399" barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesSummary.recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inventory' && (
          <>
            {/* Inventory Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{inventorySummary.totalItems}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
                <p className="mt-2 text-3xl font-semibold text-yellow-600">{inventorySummary.lowStockItems}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
                <p className="mt-2 text-3xl font-semibold text-red-600">{inventorySummary.outOfStockItems}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{inventorySummary.totalValue}</p>
              </div>
            </div>

            {/* Inventory Category Breakdown Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={inventorySummary.categoryBreakdown}
                      dataKey="items"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ category, items }) => `${category} (${items})`}
                    >
                      {inventorySummary.categoryBreakdown.map((entry, idx) => (
                        <Cell key={`cell-inv-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Low Stock Alerts Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Low Stock Alerts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Ordered</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventorySummary.lowStockAlerts.map((alert) => (
                      <tr key={alert.item}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{alert.currentStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{alert.minStock}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.lastOrdered}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Stock Movements Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Stock Movements</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventorySummary.recentStockMovements.map((movement, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{movement.item}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            movement.type === 'Received' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {movement.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{movement.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'customer' && (
          <>
            {/* Customer Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.totalCustomers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-green-600">{customerSummary.newCustomers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Returning Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-blue-600">{customerSummary.returningCustomers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.averageOrderValue}</p>
              </div>
            </div>

            {/* Customer Segments Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Segments</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSummary.customerSegments}
                      dataKey="percentage"
                      nameKey="segment"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ segment, percentage }) => `${segment} (${percentage}%)`}
                    >
                      {customerSummary.customerSegments.map((entry, idx) => (
                        <Cell key={`cell-cust-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Customers Table */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Customers by Spending</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerSummary.topCustomers.map((customer) => (
                      <tr key={customer.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{customer.totalSpent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Feedback Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Feedback</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerSummary.customerFeedback}>
                    <XAxis dataKey="rating" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#f472b6" barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === 'staff' && (
          <>
            {/* Staff Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Staff</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{staffSummary.totalStaff}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Present Today</h3>
                <p className="mt-2 text-3xl font-semibold text-green-600">{staffSummary.presentToday}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">On Leave</h3>
                <p className="mt-2 text-3xl font-semibold text-yellow-600">{staffSummary.onLeave}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Absent</h3>
                <p className="mt-2 text-3xl font-semibold text-red-600">{staffSummary.absent}</p>
              </div>
            </div>

            {/* Staff Performance Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Performance</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffSummary.staffPerformance} layout="vertical">
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="ordersHandled" fill="#a78bfa" barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance Line Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Summary</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={staffSummary.attendanceSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="present" stroke="#34d399" strokeWidth={3} />
                    <Line type="monotone" dataKey="absent" stroke="#f472b6" strokeWidth={3} />
                    <Line type="monotone" dataKey="onLeave" stroke="#fbbf24" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Shift Performance Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shift Performance</h3>
              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={staffSummary.shiftPerformance}>
                    <XAxis dataKey="shift" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#60a5fa" barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 