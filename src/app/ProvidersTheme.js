'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

const ProvidersTheme = ({ children }) => {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}

export default ProvidersTheme
