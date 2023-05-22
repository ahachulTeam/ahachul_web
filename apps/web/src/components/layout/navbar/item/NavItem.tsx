import { isMatchRoute } from '@ahhachul/lib'
import Link from 'next/link'

import { useRouter } from 'next/router'
import * as S from './NavItem.styled'

interface NavItemProps {
  label: string
  path: string
  icon: React.ReactElement
}

export default function NavItem({ label, path, icon }: NavItemProps) {
  const { pathname } = useRouter()

  const isCurrentPage = isMatchRoute(path, pathname)

  return (
    <S.NavItem>
      <Link href={path} aria-current={isCurrentPage ? 'page' : 'false'}>
        {icon}
        <span>{label}</span>
      </Link>
    </S.NavItem>
  )
}
