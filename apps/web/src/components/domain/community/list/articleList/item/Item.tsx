import { getCurrentTime } from '@ahhachul/lib'
import { Badge } from '@ahhachul/ui'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import * as S from './styled'
import { MessageCircleIcon, ThumbsUpIcon } from '@/assets/icons'
import { ARTICLE_DEFAULT_THUMBNAIL } from '@/constants'
import { CommunityOverViewModel } from '@/types/community'

interface ItemProps {
  data: CommunityOverViewModel
}

function Item({ data }: ItemProps) {
  const hasImage = data?.image

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.srcset = ARTICLE_DEFAULT_THUMBNAIL
  }

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement
    if (target.naturalWidth < 50) {
      handleImgError(e)
    }
  }

  return (
    <S.Item>
      <article>
        <Link href={`community/${data.id}`} css={S.linkCss} />
        <S.ColumnFlex css={S.gapCss}>
          <S.RowFlex>
            <S.ColumnFlex>
              <Badge variant={`${data.subwayLineId}호선`} css={S.customBadgeCss} />
              <h4>{data.title}</h4>
              <p>{data.content}</p>
            </S.ColumnFlex>
            {hasImage && (
              <S.Thumbnail>
                <LazyLoadImage
                  src={data?.image?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL}
                  alt=""
                  width="100%"
                  height="100%"
                  effect="opacity"
                  onError={handleImgError}
                  onLoad={handleImgLoad}
                />
              </S.Thumbnail>
            )}
          </S.RowFlex>
          <S.Box>
            <span>{getCurrentTime(data.createdAt)}</span>
            <S.CommentBox>
              <ThumbsUpIcon />
              <span>{data.likeCnt}</span>
              <MessageCircleIcon />
              <span>{data.commentCnt}</span>
            </S.CommentBox>
          </S.Box>
        </S.ColumnFlex>
      </article>
    </S.Item>
  )
}

export default Item
