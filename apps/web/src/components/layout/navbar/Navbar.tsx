import { useScrollDirection } from '@ahhachul/lib'
import { useRouter } from 'next/router'

import NavItem from './item/NavItem'
import * as S from './Navbar.styled'
import { NAV_MENUS } from '@/assets/static'

export default function Navbar() {
  const { pathname } = useRouter()
  const direction = useScrollDirection()

  return (
    <S.Navbar data-show={pathname !== '/onboarding' && direction === 'up'}>
      <S.MenuList>
        {NAV_MENUS.map(({ label, path, SvgIcon }) => (
          <NavItem key={label} label={label} path={path} icon={<SvgIcon />} />
        ))}
      </S.MenuList>
    </S.Navbar>
  )
}
