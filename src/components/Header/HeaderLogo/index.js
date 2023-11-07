import IconLogo from '@/components/icons/IconLogo'
import Link from 'next/link'

const HeaderLogo = () => {
  return (
    <Link href={'/'} className="flex items-center ">
      <IconLogo></IconLogo>
      <span className="text-[28px] font-bold uppercase  tracking-widest">
        King
      </span>
    </Link>
  )
}

export default HeaderLogo
