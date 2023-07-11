import { getCurrentTime, useLazyLoading } from '@ahhachul/lib'
import Image from 'next/image'
import Link from 'next/link'

import * as S from './styled'
import { CommentIcon } from '@/assets/icons'
import { ARTICLE_DEFAULT_THUMBNAIL } from '@/constants'
import { CommunityOverViewModel } from '@/types/community'

interface ItemProps {
  data: CommunityOverViewModel
}

function Item({ data }: ItemProps) {
  const { isLoaded, targetRef } = useLazyLoading()

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
      <article ref={targetRef}>
        <Link href={`community/${data.id}`}>
          <S.Flex>
            <h4>{data.title}</h4>
            <p>{data.content}</p>
            <S.Box>
              <span>{getCurrentTime(data.createdAt)}</span>
              <span>{data.writer}</span>
              <span>좋아요 {data.likeCnt}</span>
            </S.Box>
            <S.CommentBox>
              <CommentIcon />
              <span>{data.commentCnt}</span>
            </S.CommentBox>
          </S.Flex>
          <S.Thumbnail>
            {isLoaded && (
              <Image
                fill
                alt=""
                src={data?.image?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL}
                onError={handleImgError}
                onLoad={handleImgLoad}
              />
            )}
          </S.Thumbnail>
        </Link>
      </article>
    </S.Item>
  )
}

export default Item
