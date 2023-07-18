import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'

import { useCallback, useState } from 'react'
import * as S from './styled'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'
import { useManagementCommunityPostReacting } from '@/queries/community/useCommunityPostLikes'

function Contents() {
  const router = useRouter()

  const { query } = useRouter()

  const { data: articleDetail } = useCommunityDetailQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  const { likes, removeHates, removeLikes, hates } = useManagementCommunityPostReacting()

  const [tempLikesClicked, setTempLikesClicked] = useState(false)
  const [tempHatesClicked, setTempHatesClicked] = useState(false)

  const handleLikeClick = () => {
    setTempLikesClicked(true)
    const req = { postId: Number(router.query?.id) }
    articleDetail?.result?.likeYn === 'Y' ? removeLikes(req) : likes(req)
  }

  const handleHateClick = () => {
    setTempHatesClicked(true)
    const req = { postId: Number(router.query?.id) }
    articleDetail?.result?.hateYn === 'Y' ? removeHates(req) : hates(req)
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
        <S.Title>{articleDetail?.result?.title}</S.Title>
        <S.FragmentInfos>
          <div>
            <span>{getCurrentTime(articleDetail?.result?.createdAt)}</span>
            <span>{articleDetail?.result?.writer}</span>
          </div>
          <div>
            <span>조회 {articleDetail?.result?.viewCnt}</span>
            {/* <span>댓글 {articleDetail?.result.commentCnt}</span> */}
            <span>좋아요 {articleDetail?.result?.likeCnt}</span>
          </div>
        </S.FragmentInfos>
        {articleDetail?.result?.images && articleDetail?.result?.images?.length > 0 && (
          <div css={S.imgCss}>
            {articleDetail?.result.images.map((img, idx) => (
              <figure key={img?.imageId}>
                <img src={img?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL} alt="" />
                <figcaption>{`${articleDetail?.result?.title}-${idx}`}</figcaption>
              </figure>
            ))}
          </div>
        )}
        <S.DetailInfo>{articleDetail?.result?.content}</S.DetailInfo>
        <S.HashTagList>
          {articleDetail?.result?.hashTags.map((tag, i) => {
            return (
              <li key={i}>
                <Tag label={`#${tag}`} variant="primary" onClick={searchHashTag(tag)} />
              </li>
            )
          })}
        </S.HashTagList>
        <S.ContentsReactBtnGroup>
          {articleDetail?.result?.hateYn !== 'Y' && (
            <Button
              data-status={(tempLikesClicked || articleDetail?.result?.likeYn === 'Y') && 'likes'}
              css={S.customButtonCss}
              variant="outline"
              size="smd"
              label={
                articleDetail?.result?.likeCnt ? (
                  <>
                    좋아요 <b>{articleDetail?.result?.likeCnt}</b>
                  </>
                ) : (
                  '좋아요'
                )
              }
              onClick={handleLikeClick}
            />
          )}
          {articleDetail?.result?.likeYn !== 'Y' && (
            <Button
              data-status={(tempHatesClicked || articleDetail?.result?.hateYn === 'Y') && 'hates'}
              css={S.customButtonCss}
              variant="outline"
              size="smd"
              label={`${articleDetail?.result?.hateCnt ? `싫어요 ${articleDetail?.result?.hateCnt}` : '싫어요'}`}
              onClick={handleHateClick}
            />
          )}
        </S.ContentsReactBtnGroup>
      </S.Contents>
    </S.ContentSection>
  )
}

export default Contents
