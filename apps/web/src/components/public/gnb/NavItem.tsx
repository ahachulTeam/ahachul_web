import { isMatchRoute } from '@ahhachul/lib'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { useRouter } from 'next/router'

interface NavItemProps {
  label: string
  path: string
  icon: React.ReactElement
}

const NavItem = ({ label, path, icon }: NavItemProps) => {
  const { pathname } = useRouter()

  const isCurrentPage = isMatchRoute(path, pathname)

  return (
    <BottomNavItem>
      <Link href={path} aria-current={isCurrentPage ? 'page' : 'false'}>
        {icon}
        <span>{label}</span>
      </Link>
    </BottomNavItem>
  )
}

const BottomNavItem = styled.li`
  ${({ theme }) => css`
    width: 78px;
    height: 100%;

    & > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 4px;
      width: 100%;
      height: 100%;

      & > svg {
        width: 20px;
        height: 20px;
        stroke: ${theme.colors.gray_30};
      }

      & > span {
        ${theme.fonts.medium10};
        color: ${theme.colors.gray_30};
      }

      &[aria-current='page'] {
        & > svg {
          stroke: ${theme.colors.primary};
        }

        & > span {
          color: ${theme.colors.primary};
        }
      }
    }
  `}
`

export default NavItem
