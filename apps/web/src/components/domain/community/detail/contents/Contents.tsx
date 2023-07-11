import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import * as S from './styled'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import { useCommunityPostLike, useCommunityRemoveLike } from '@/queries/community/useCommunityPostLikes'
import { CommunityDetailModel } from '@/types/community'

interface ContentsProps {
  data?: CommunityDetailModel
}

function Contents({ data }: ContentsProps) {
  const router = useRouter()

  const { mutate: likes } = useCommunityPostLike()
  const { mutate: removes } = useCommunityRemoveLike()

  const searchHashTag = useCallback(
    (value: string) => () => {
      router.push(
        {
          pathname: PATH.COMMUNITY,
          query: { tags: value },
        },
        undefined,
        { shallow: true }
      )
    },
    [router]
  )

  return (
    <S.ContentSection>
      <S.Contents>
        <S.Title>{data?.title}</S.Title>
        <S.FragmentInfos>
          <div>
            <span>{getCurrentTime(data?.createdAt)}</span>
            <span>{data?.writer}</span>
          </div>
          <div>
            <span>조회 {data?.views}</span>
            {/* <span>댓글 {data.commentCnt}</span> */}
            <span>좋아요 {data?.likes}</span>
          </div>
        </S.FragmentInfos>
        <div css={S.imgCss}>
          {data?.images?.map((img, idx) => (
            <figure key={img?.imageId}>
              <img src={img?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL} alt="" />
              <figcaption>{`${data?.title}-${idx}`}</figcaption>
            </figure>
          ))}
        </div>
        <S.DetailInfo>{data?.content}</S.DetailInfo>
        <S.HashTagList>
          {data?.hashTags.map((tag, i) => {
            return (
              <li key={i}>
                <Tag label={`#${tag}`} variant="primary" onClick={searchHashTag(tag)} />
              </li>
            )
          })}
        </S.HashTagList>
        <S.ContentsReactBtnGroup>
          <Button
            variant="outline"
            size="smd"
            label="좋아요"
            onClick={() => likes({ postId: Number(router.query?.id) })}
          />
          <Button
            variant="outline"
            size="smd"
            label="싫어요"
            onClick={() => removes({ postId: Number(router.query?.id) })}
          />
        </S.ContentsReactBtnGroup>
      </S.Contents>
    </S.ContentSection>
  )
}

export default Contents
