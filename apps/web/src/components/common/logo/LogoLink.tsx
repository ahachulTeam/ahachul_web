import Link from 'next/link'

import * as S from './styled'
// import { LogoIcon } from '@/assets/icons'

import { PATH } from '@/constants'
import { StaticSEO } from '@/constants/seo'

interface LogoLinkProps {
  className?: string
}

function LogoLink({ className }: LogoLinkProps) {
  return (
    <h1>
      <Link css={S.anchor} href={PATH.HOME} className={className} aria-label="아하철">
        {/* <LogoIcon aria-hidden="true" /> */}
        <b>AhHa</b>chul
        <div css={S.visuallyHidden}>{StaticSEO.main.sitename}</div>
      </Link>
    </h1>
  )
}

export default LogoLink
