import React from "react"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MainLayout } from "@/presentation/MainLayout"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Foody',
  description: 'Recipes Application',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
