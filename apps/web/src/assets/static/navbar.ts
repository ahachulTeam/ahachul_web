import * as I from '@/assets/icons'

import { PATH } from '@/constants'

export const NAV_MENUS = [
  { label: '홈', path: PATH.HOME, SvgIcon: I.HouseIcon },
  { label: '유실물', path: PATH.LOST, SvgIcon: I.QuestionBoxIcon },
  { label: '게시판', path: PATH.COMMUNITY, SvgIcon: I.BoardIcon },
  { label: '실험실', path: PATH.LABS, SvgIcon: I.PeoplesIcon },
  { label: '민원접수', path: PATH.COMPLAINTS, SvgIcon: I.SpeakerIcon },
]
