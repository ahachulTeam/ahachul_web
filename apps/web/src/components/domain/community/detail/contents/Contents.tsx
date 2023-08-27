import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import * as S from './styled'
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
    <S.ContentSection>
      <S.Contents>
        <S.Title>{articleDetail?.title}</S.Title>
        <S.FragmentInfos>
          <div>
            <span>{getCurrentTime(articleDetail?.createdAt)}</span>
            <span>{articleDetail?.writer}</span>
          </div>
          <div>
            <span>조회 {articleDetail?.viewCnt}</span>
            {/* <span>댓글 {articleDetail?commentCnt}</span> */}
            <span>좋아요 {articleDetail?.likeCnt}</span>
          </div>
        </S.FragmentInfos>
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
        <S.DetailInfo>{articleDetail?.content}</S.DetailInfo>
        <S.HashTagList>
          {articleDetail?.hashTags.map((tag, i) => {
            return (
              <li key={i}>
                <Tag label={`#${tag}`} variant="primary" onClick={searchHashTag(tag)} />
              </li>
            )
          })}
        </S.HashTagList>
        <S.ContentsReactBtnGroup>
          <Button
            data-status={articleDetail?.likeYn === 'Y' && 'likes'}
            css={S.customButtonCss}
            variant="outline"
            size="smd"
            label={<>좋아요 {articleDetail?.likeCnt !== 0 && <b>{articleDetail?.likeCnt}</b>}</>}
            onClick={handleLikeClick}
          />
          <Button
            data-status={articleDetail?.hateYn === 'Y' && 'hates'}
            css={S.customButtonCss}
            variant="outline"
            size="smd"
            label={`${articleDetail?.hateCnt ? `싫어요 ${articleDetail?.hateCnt}` : '싫어요'}`}
            onClick={handleHateClick}
          />
        </S.ContentsReactBtnGroup>
      </S.Contents>
    </S.ContentSection>
  )
}

export default Contents
