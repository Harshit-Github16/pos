import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../context/AuthContext'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] })

export const metadata = {
  title: 'Muneem Ji - Restaurant POS System',
  description: 'Modern POS system for restaurants and hotels',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
