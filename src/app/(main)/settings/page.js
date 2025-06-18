'use client'
import { useState } from 'react'
import RoleGuard from '@/components/RoleGuard'

export default function SettingsPage() {
  return (
    <RoleGuard requiredPermission="settings">
      <SettingsContent />
    </RoleGuard>
  )
}

function SettingsContent() {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Muneem Restaurant',
    address: '123 Main Street, Delhi',
    phone: '+91 98765 43210',
    email: 'info@muneem.com',
    gst: 'GSTIN12345',
  })
  const [taxSettings, setTaxSettings] = useState({
    cgst: 2.5,
    sgst: 2.5,
    serviceCharge: 5,
  })
  const [printerSettings, setPrinterSettings] = useState({
    printerName: 'Epson TM-T88V',
    paperSize: '80mm',
    autoPrint: true,
  })
  const [userPrefs, setUserPrefs] = useState({
    theme: 'Orange',
    notifications: true,
    language: 'English',
  })

  return (
    <div className="space-y-8 max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      {/* Business Info */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Business Info</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input type="text" value={businessInfo.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" value={businessInfo.address} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" value={businessInfo.phone} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" value={businessInfo.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GSTIN</label>
            <input type="text" value={businessInfo.gst} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
          </div>
        </form>
      </section>
      {/* Tax Settings */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Tax Settings</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CGST (%)</label>
              <input type="number" value={taxSettings.cgst} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SGST (%)</label>
              <input type="number" value={taxSettings.sgst} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Charge (%)</label>
              <input type="number" value={taxSettings.serviceCharge} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
          </div>
        </form>
      </section>
      {/* Printer Settings */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Printer Settings</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Printer Name</label>
            <input type="text" value={printerSettings.printerName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Paper Size</label>
              <input type="text" value={printerSettings.paperSize} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" checked={printerSettings.autoPrint} className="mr-2" readOnly />
              <label className="text-sm text-gray-700">Auto Print Bills</label>
            </div>
          </div>
        </form>
      </section>
      {/* User Preferences */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">User Preferences</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Theme</label>
              <input type="text" value={userPrefs.theme} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
            </div>
            <div className="flex items-center mt-6">
              <input type="checkbox" checked={userPrefs.notifications} className="mr-2" readOnly />
              <label className="text-sm text-gray-700">Enable Notifications</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <input type="text" value={userPrefs.language} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900" readOnly />
          </div>
        </form>
      </section>
    </div>
  )
} 