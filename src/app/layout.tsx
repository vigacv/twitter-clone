import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseProvider from './supabase-provider'
import LeftSideBar from '@/components/left-sidebar'
import RightSection from '@/components/right-section'
import BottomNavBar from '@/components/bottom-navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: 'Twitter clone created with NextJS and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='w-full h-full flex justify-center items-center text-white relative bg-black'>
          <div className='xl:max-w-[70vw] w-full h-full flex relative'>
            <LeftSideBar />
            <SupabaseProvider>{children}</SupabaseProvider>
            <RightSection />
          </div >
        </div >
        <BottomNavBar />
      </body>
    </html>
  )
}
