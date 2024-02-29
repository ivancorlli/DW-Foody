'use client'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>)
}
