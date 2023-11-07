import IconDark from '@/components/icons/IconDark'
import IconLight from '@/components/icons/IconLight'
import { links } from '@/utils/constants'
import Link from 'next/link'

const HeaderNav = ({ currentTheme, setTheme }) => {
  return (
    <ul className="hidden md:flex py-[10px] px-[32px] bg-white rounded-full border  border-black  items-center gap-x-5">
      {links.map((link) => (
        <li key={link.title} className="font-semibold capitalize text-gray-33">
          <Link href={link.href}>{link.title}</Link>
        </li>
      ))}
      <li>
        {currentTheme === 'dark' ? (
          <button
            onClick={() => setTheme('light')}
            className="flex items-start justify-center p-1 text-white bg-black rounded-full"
          >
            <IconLight></IconLight>
          </button>
        ) : (
          <button
            onClick={() => setTheme('dark')}
            className="flex items-start justify-center p-1 text-white bg-black rounded-full"
          >
            <IconDark></IconDark>
          </button>
        )}
      </li>
    </ul>
  )
}

export default HeaderNav
