import IconBar from '@/components/icons/IconBar'
import IconCreate from '@/components/icons/IconCreate'
import IconDark from '@/components/icons/IconDark'
import IconHome from '@/components/icons/IconHome'
import IconLight from '@/components/icons/IconLight'
import IconLogin from '@/components/icons/IconLogin'
import IconLogout from '@/components/icons/IconLogout'
import IconProfile from '@/components/icons/IconProfile'
import IconSearch from '@/components/icons/IconSearch'
import Tippy from '@tippyjs/react/headless'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const HeaderProfile = ({ currentTheme, setTheme }) => {
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null

  const [showProfile, setShopProfile] = useState(false)

  const logout = () => {
    localStorage.removeItem('user')
  }

  return (
    <Tippy
      interactive
      placement="bottom"
      visible={showProfile}
      onClickOutside={() => setShopProfile(false)}
      render={(attrs) => (
        <div
          className="shadow-lg w-[150px] p-[10px] border bg-white rounded-sm flex flex-col text-gray-33"
          tabIndex="-1"
          {...attrs}
        >
          <div className="flex items-center justify-center md:hidden mb-[10px]">
            {currentTheme === 'dark' ? (
              <button
                onClick={() => setTheme('light')}
                className="flex items-start justify-center p-1 px-5 text-white bg-black rounded-full"
              >
                <IconLight></IconLight>
              </button>
            ) : (
              <button
                onClick={() => setTheme('dark')}
                className="flex items-start justify-center p-1 px-5 text-white bg-black rounded-full"
              >
                <IconDark></IconDark>
              </button>
            )}
          </div>
          <Link
            onClick={() => setShopProfile(false)}
            href={`/profile/${user?._id}`}
            className="flex items-center hover:bg-gray-200 transition-all gap-x-[15px] px-[15px] mb-[5px] py-[5px] cursor-pointer"
          >
            <span>
              <IconProfile />
            </span>
            <span className="font-medium">Profile</span>
          </Link>
          <Link
            onClick={() => setShopProfile(false)}
            href={'/'}
            className="md:hidden flex hover:bg-gray-200 transition-all items-center gap-x-[15px] px-[15px] mb-[5px] py-[5px]  cursor-pointer"
          >
            <span>
              <IconHome />
            </span>
            <span className="font-medium">Home</span>
          </Link>
          <Link
            onClick={() => setShopProfile(false)}
            href={'/search'}
            className="md:hidden flex hover:bg-gray-200 transition-all items-center gap-x-[15px] px-[15px] mb-[5px] py-[5px]  cursor-pointer"
          >
            <span>
              <IconSearch />
            </span>
            <span className="font-medium">Search</span>
          </Link>
          <Link
            onClick={() => setShopProfile(false)}
            href={'/create'}
            className="md:hidden flex hover:bg-gray-200 transition-all items-center gap-x-[15px] px-[15px] mb-[5px] py-[5px]  cursor-pointer"
          >
            <span>
              <IconCreate />
            </span>
            <span className="font-medium">Create</span>
          </Link>

          {!user ? (
            <Link
              onClick={() => setShopProfile(false)}
              href={'/login'}
              className="flex items-center hover:bg-gray-200 transition-all gap-x-[15px] px-[15px] py-[5px] cursor-pointer"
            >
              <span>
                <IconLogin />
              </span>
              <span className="font-medium">Login</span>
            </Link>
          ) : (
            <Link
              onClick={() => {
                setShopProfile(false)
                logout()
              }}
              href={'/'}
              className="flex items-center hover:bg-gray-200 transition-all gap-x-[15px] px-[15px] py-[5px] cursor-pointer"
            >
              <span>
                <IconLogout />
              </span>
              <span className="font-medium">Logout</span>
            </Link>
          )}
        </div>
      )}
    >
      <span
        onClick={() => setShopProfile(!showProfile)}
        className="cursor-pointer"
      >
        <IconBar />
      </span>
    </Tippy>
  )
}

export default HeaderProfile
