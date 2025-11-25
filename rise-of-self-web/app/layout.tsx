import './globals.css'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { GameProvider } from '@/context/Gamecontext'; 

export const metadata: Metadata = {
  title: 'Rise of Self',
  description: 'Gamifica tu vida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {}
        <GameProvider>
            {children}
            <Footer />
        </GameProvider>
      </body>
    </html>
  )
}