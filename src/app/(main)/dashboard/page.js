'use client'

import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { user, hasPermission } = useAuth()

  const stats = [
    { name: 'Daily Sales', value: '₹12,500', icon: '💰' },
    { name: 'Weekly Sales', value: '₹87,500', icon: '📈' },
    { name: 'Total Orders', value: '156', icon: '🧾' },
    { name: 'Total Customers', value: '89', icon: '👥' },
  ]

  const recentOrders = [
    { id: 'ORD001', customer: 'Rahul Sharma', amount: '₹1,400', status: 'Completed', time: '2:30 PM' },
    { id: 'ORD002', customer: 'Priya Patel', amount: '₹420', status: 'Completed', time: '2:15 PM' },
    { id: 'ORD003', customer: 'Amit Kumar', amount: '₹610', status: 'Completed', time: '2:00 PM' },
    { id: 'ORD004', customer: 'Neha Singh', amount: '₹800', status: 'Completed', time: '1:45 PM' },
  ]

  const topSellingItems = [
    { name: 'Butter Chicken', quantity: '50', revenue: '₹22,500' },
    { name: 'Paneer Butter Masala', quantity: '40', revenue: '₹14,000' },
    { name: 'Veg Biryani', quantity: '35', revenue: '₹8,750' },
    { name: 'Butter Naan', quantity: '100', revenue: '₹5,000' },
  ]

  // Get role-specific quick actions
  const getQuickActions = () => {
    const actions = []
    
    if (hasPermission('billing')) {
      actions.push({
        name: '🧾 New Order',
        href: '/billing',
        bgColor: 'bg-orange-600 hover:bg-orange-700'
      })
    }
    
    if (hasPermission('inventory')) {
      actions.push({
        name: '📦 Add Inventory',
        href: '/inventory',
        bgColor: 'bg-blue-600 hover:bg-blue-700'
      })
    }
    
    if (hasPermission('reports')) {
      actions.push({
        name: '📊 View Reports',
        href: '/reports',
        bgColor: 'bg-green-600 hover:bg-green-700'
      })
    }
    
    if (hasPermission('menu')) {
      actions.push({
        name: '🍽️ Manage Menu',
        href: '/menu',
        bgColor: 'bg-purple-600 hover:bg-purple-700'
      })
    }
    
    return actions
  }

  const quickActions = getQuickActions()

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Namaste, {user?.name}! 👋
        </h1>
        <p className="mt-1 text-sm sm:text-base text-gray-600">
          Welcome to Muneem Ji POS System. Here&apos;s your business overview.
        </p>
        <div className="mt-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            {user?.role === 'admin' ? 'Administrator' : 'Receptionist'}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-xl sm:text-2xl">{stat.icon}</span>
                </div>
                <div className="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-base sm:text-lg font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <a
                key={action.name}
                href={action.href}
                className={`inline-flex items-center justify-center min-w-[140px] px-4 py-2 rounded-md text-sm font-medium text-white ${action.bgColor} transition-colors`}
              >
                {action.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.customer}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{order.amount}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Items - Only show for admin */}
      {hasPermission('reports') && (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Selling Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topSellingItems.map((item) => (
                  <tr key={item.name} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{item.quantity}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
} 