'use client'

import { useState } from 'react'

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('sales')
  const [dateRange, setDateRange] = useState('today')

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
    salesByCategory: [
      { category: 'Food', amount: '₹28,500', percentage: 63 },
      { category: 'Beverages', amount: '₹12,750', percentage: 28 },
      { category: 'Desserts', amount: '₹4,000', percentage: 9 },
    ],
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
    hourlySales: [
      { hour: '10 AM', sales: '₹4,500' },
      { hour: '11 AM', sales: '₹5,800' },
      { hour: '12 PM', sales: '₹8,200' },
      { hour: '1 PM', sales: '₹7,500' },
      { hour: '2 PM', sales: '₹6,300' },
      { hour: '3 PM', sales: '₹4,800' },
      { hour: '4 PM', sales: '₹3,900' },
      { hour: '5 PM', sales: '₹4,650' },
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
          <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-1 py-4 text-sm font-medium border-b-2 ${
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
      <div className="space-y-6">
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

            {/* Sales by Category */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Sales by Category</h3>
                <div className="mt-4 space-y-4">
                  {salesSummary.salesByCategory.map((category) => (
                    <div key={category.category} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{category.category}</p>
                          <p className="text-sm font-medium text-gray-900">{category.amount}</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Hourly Sales Chart */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Hourly Sales</h3>
                <div className="mt-4 h-64 flex items-end space-x-2">
                  {salesSummary.hourlySales.map((hour) => (
                    <div key={hour.hour} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-orange-600 rounded-t"
                        style={{
                          height: `${(parseInt(hour.sales.replace('₹', '').replace(',', '')) / 8200) * 100}%`,
                        }}
                      />
                      <p className="mt-2 text-xs text-gray-500">{hour.hour}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Selling Items */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Top Selling Items</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity Sold
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {salesSummary.topSellingItems.map((item) => (
                        <tr key={item.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.revenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {salesSummary.recentOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inventory' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Items</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{inventorySummary.totalItems}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
                <p className="mt-2 text-3xl font-semibold text-orange-600">{inventorySummary.lowStockItems}</p>
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

            {/* Category Breakdown */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Category Breakdown</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventorySummary.categoryBreakdown.map((category) => (
                        <tr key={category.category}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {category.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.items}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {category.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Low Stock Alerts</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Current Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Minimum Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Ordered
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventorySummary.lowStockAlerts.map((item) => (
                        <tr key={item.item}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.item}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            {item.currentStock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.minStock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.lastOrdered}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Stock Movements */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Recent Stock Movements</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inventorySummary.recentStockMovements.map((movement) => (
                        <tr key={`${movement.item}-${movement.date}-${movement.time}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {movement.item}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                movement.type === 'Received'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}
                            >
                              {movement.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {movement.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'customer' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.totalCustomers}</p>
                <p className="mt-1 text-sm text-green-600">↑ 5% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.newCustomers}</p>
                <p className="mt-1 text-sm text-green-600">↑ 12% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Returning Customers</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.returningCustomers}</p>
                <p className="mt-1 text-sm text-green-600">↑ 8% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">{customerSummary.averageOrderValue}</p>
                <p className="mt-1 text-sm text-green-600">↑ 3% from last month</p>
              </div>
            </div>

            {/* Customer Segments */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Customer Segments</h3>
                <div className="mt-4 space-y-4">
                  {customerSummary.customerSegments.map((segment) => (
                    <div key={segment.segment} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{segment.segment}</p>
                          <p className="text-sm font-medium text-gray-900">{segment.count} customers</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${segment.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Top Customers</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Order
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerSummary.topCustomers.map((customer) => (
                        <tr key={customer.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {customer.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.orders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.totalSpent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {customer.lastOrder}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Customer Feedback */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Customer Feedback</h3>
                <div className="mt-4 space-y-4">
                  {customerSummary.customerFeedback.map((feedback) => (
                    <div key={feedback.rating} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {feedback.rating} {feedback.rating === 1 ? 'Star' : 'Stars'}
                          </p>
                          <p className="text-sm font-medium text-gray-900">{feedback.count} customers</p>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-600 h-2 rounded-full"
                            style={{ width: `${feedback.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'staff' && (
          <>
            {/* Summary Cards */}
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

            {/* Staff Performance */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Staff Performance</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Staff Member
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders Handled
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffSummary.staffPerformance.map((staff) => (
                        <tr key={staff.name}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {staff.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {staff.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {staff.ordersHandled}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {staff.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{staff.rating}</span>
                              <span className="ml-1 text-yellow-400">★</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Attendance Summary</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Present
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Absent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          On Leave
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffSummary.attendanceSummary.map((day) => (
                        <tr key={day.date}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {day.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                            {day.present}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                            {day.absent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                            {day.onLeave}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Shift Performance */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">Shift Performance</h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Shift
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Staff
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffSummary.shiftPerformance.map((shift) => (
                        <tr key={shift.shift}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {shift.shift}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shift.staff}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shift.orders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shift.sales}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 