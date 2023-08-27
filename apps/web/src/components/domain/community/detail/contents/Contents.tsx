import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import * as S from './styled'
import { MessageCircleIcon, ThumbsUpIcon } from '@/assets/icons'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'
import { useManagementCommunityPostReacting } from '@/queries/community/useCommunityPostLikes'

function Contents() {
  const router = useRouter()
  const { query } = router

  const { data: articleDetail } = useCommunityDetailQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  const { getToggleLike, getToggleHate } = useManagementCommunityPostReacting()

  const handleLikeClick = () => {
    const toggleLike = getToggleLike(articleDetail?.likeYn)
    const req = { postId: Number(router.query?.id) }

    toggleLike(req)
  }

  const handleHateClick = () => {
    const toggleHate = getToggleHate(articleDetail?.hateYn)
    const req = { postId: Number(router.query?.id) }

    toggleHate(req)
  }

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
    <>
      <S.ContentsHeader>
        <S.Title>{articleDetail?.title}</S.Title>
        <S.FragmentInfos>
          <span>{articleDetail?.writer}</span>
          <span>{getCurrentTime(articleDetail?.createdAt)}</span>
        </S.FragmentInfos>
      </S.ContentsHeader>
      <S.DetailInfo>{articleDetail?.content}</S.DetailInfo>
      {articleDetail?.images && articleDetail?.images?.length > 0 && (
        <div css={S.imgCss}>
          {articleDetail?.images.map((img, idx) => (
            <figure key={img?.imageId}>
              <img src={img?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL} alt="" />
              <figcaption>{`${articleDetail?.title}-${idx}`}</figcaption>
            </figure>
          ))}
        </div>
      )}
      {articleDetail?.hashTags && articleDetail?.hashTags?.length > 0 && (
        <S.HashTagList>
          {articleDetail?.hashTags.map((tag, i) => {
            return (
              <li key={i}>
                <Tag label={`#${tag}`} variant="primary" onClick={searchHashTag(tag)} />
              </li>
            )
          })}
        </S.HashTagList>
      )}
      <S.ContentsReactBtnGroup>
        <Button
          data-status={articleDetail?.likeYn === 'Y' && 'likes'}
          css={S.customButtonCss}
          variant="outline"
          size="smd"
          label={
            <div
              css={css`
                display: flex;
                gap: 4px;
                align-items: center;
              `}
            >
              <ThumbsUpIcon /> <span>좋아요 {articleDetail?.likeCnt !== 0 && <b>{articleDetail?.likeCnt}</b>}</span>
            </div>
          }
          onClick={handleLikeClick}
        />
        <Button
          data-status={articleDetail?.hateYn === 'Y' && 'hates'}
          css={S.customButtonCss}
          variant="outline"
          size="smd"
          label={
            <div
              css={css`
                display: flex;
                gap: 4px;
                align-items: center;
              `}
            >
              <MessageCircleIcon />
              <span>{articleDetail?.hateCnt ? `댓글 ${articleDetail?.hateCnt}` : '댓글'}</span>
            </div>
          }
          onClick={handleHateClick}
        />
      </S.ContentsReactBtnGroup>
    </>
  )
}

export default Contents
