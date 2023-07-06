import { getCurrentTime } from '@ahhachul/lib'
import { Badge } from '@ahhachul/ui'
import Image from 'next/image'
import Link from 'next/link'

import * as S from './styled'
import { CommentIcon } from '@/assets/icons'

import type { View } from '@/atoms/view'
import { PATH } from '@/constants/path'
import { LostPost, LostStatus } from '@/types/lost'

interface LostItemProps {
  view?: View
  post: LostPost
}

export default function LostItem({ view = 'list', post }: LostItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {}

  return (
    <S.LostItem data-view={view}>
      <S.Thumbnail>
        <Image src={post.imgUrl || '/images/default_thumbnail.svg'} fill alt="lost item thumbnail" />
      </S.Thumbnail>
      <S.Contents>
        <S.Title>
          {post.status === LostStatus.COMPLETE && <Badge variant="찾기 완료" />}
          <h3>{post.title}</h3>
        </S.Title>
        <S.Content>{post.content}</S.Content>
        <S.Meta>
          <S.Metadata>
            <span>{post.subwayLine}호선</span>
            <time>{getCurrentTime(post.date)}</time>
          </S.Metadata>
          <S.Utils>
            <S.UtilBtn type="button" aria-label="comment" onClick={handleCommentClick}>
              <CommentIcon />
              <span>{post.chats}</span>
            </S.UtilBtn>
          </S.Utils>
        </S.Meta>
      </S.Contents>
      <Link href={`${PATH.LOST}/${post.id}`} css={S.link} />
    </S.LostItem>
  )
}
