import { Badge } from '@ahhachul/ui'
import Image from 'next/image'
import Link from 'next/link'

import * as S from './styled'
import { CommentIcon } from '@/assets/icons'

import { PATH } from '@/constants/path'

type View = 'list' | 'grid'

type LostStatus = 'PROGRESS' | 'COMPLETE'

type LostPost = {
  id: string
  title: string
  content: string
  writer: string
  createdBy: string
  date: string
  subwayLine: number
  chats: number
  status: LostStatus
  imgUrl: string
}

interface LostItemProps {
  view?: View
  lostItem?: LostPost
}

export default function LostItem({ view = 'list', lostItem }: LostItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {}

  return (
    <S.LostItem data-view={view}>
      <S.Thumbnail>
        <Image src={lostItem?.imgUrl ?? '/images/default_thumbnail.svg'} fill alt="lost item thumbnail" />
      </S.Thumbnail>
      <S.Contents>
        <S.Title>
          <Badge label="찾기 완료" />
          <h3>검정색 루이비통 지갑 발견했어요</h3>
        </S.Title>
        <S.Content>
          방금 4호선 당고개행에서 검정색 루이비통 지갑을 발견했어요. 제가 보관하고 있으니 쪽지 주세요.
        </S.Content>
        <S.Meta>
          <S.Metadata>
            <span>4호선</span>
            <time>1분 전</time>
          </S.Metadata>
          <S.Utils>
            <S.UtilBtn type="button" aria-label="comment" onClick={handleCommentClick}>
              <CommentIcon />
              <span>0</span>
            </S.UtilBtn>
          </S.Utils>
        </S.Meta>
      </S.Contents>
      <Link href={`${PATH.LOST}/${lostItem?.id}`} css={S.link} />
    </S.LostItem>
  )
}
