'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import HeaderLogo from './HeaderLogo'
import HeaderNav from './HeaderNav'
import HeaderProfile from './HeaderProfile'

const Header = () => {
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <header className="bg-white fixed top-0 left-0 right-0 z-[999] dark:bg-black-10 h-[76px] flex items-center justify-between px-[15px]">
      <HeaderLogo></HeaderLogo>

      <HeaderNav currentTheme={currentTheme} setTheme={setTheme}></HeaderNav>

      <HeaderProfile
        currentTheme={currentTheme}
        setTheme={setTheme}
      ></HeaderProfile>
    </header>
  )
}

export default Header
