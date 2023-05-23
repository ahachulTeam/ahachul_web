import Link from 'next/link'

// import { LogoIcon } from '@/assets/icons'

import * as S from './styled'
import { PATH } from '@/constants'
import { StaticSEO } from '@/constants/seo'

interface LogoLinkProps {
  className?: string
}

function LogoLink({ className }: LogoLinkProps) {
  return (
    <S.Logo>
      <Link href={PATH.HOME} className={className} aria-label="아하철">
        {/* <LogoIcon aria-hidden="true" /> */}
        <b>AhHa</b>chul
        <span>{StaticSEO.main.sitename}</span>
      </Link>
    </S.Logo>
  )
}

export default LogoLink
