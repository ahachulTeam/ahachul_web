import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'

import { useCallback, useState } from 'react'
import * as S from './styled'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import { useManagementCommunityPostReacting } from '@/queries/community/useCommunityPostLikes'
import { CommunityDetailModel } from '@/types/community'

interface ContentsProps {
  data?: CommunityDetailModel
}

function Contents({ data }: ContentsProps) {
  const router = useRouter()
  const { likes, removeHates, removeLikes, hates } = useManagementCommunityPostReacting()

  const [tempLikesClicked, setTempLikesClicked] = useState(false)
  const [tempHatesClicked, setTempHatesClicked] = useState(false)

  const handleLikeClick = () => {
    setTempLikesClicked(true)
    const req = { postId: Number(router.query?.id) }
    data?.likeYn === 'Y' ? removeLikes(req) : likes(req)
  }

  const handleHateClick = () => {
    setTempHatesClicked(true)
    const req = { postId: Number(router.query?.id) }
    data?.hateYn === 'Y' ? removeHates(req) : hates(req)
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
        <S.Title>{data?.title}</S.Title>
        <S.FragmentInfos>
          <div>
            <span>{getCurrentTime(data?.createdAt)}</span>
            <span>{data?.writer}</span>
          </div>
          <div>
            <span>조회 {data?.viewCnt}</span>
            {/* <span>댓글 {data.commentCnt}</span> */}
            <span>좋아요 {data?.likeCnt}</span>
          </div>
        </S.FragmentInfos>
        {data?.images && data?.images?.length > 0 && (
          <div css={S.imgCss}>
            {data.images.map((img, idx) => (
              <figure key={img?.imageId}>
                <img src={img?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL} alt="" />
                <figcaption>{`${data?.title}-${idx}`}</figcaption>
              </figure>
            ))}
          </div>
        )}
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
          {data?.hateYn !== 'Y' && (
            <Button
              data-status={(tempLikesClicked || data?.likeYn === 'Y') && 'likes'}
              css={S.customButtonCss}
              variant="outline"
              size="smd"
              label={
                data?.likeCnt ? (
                  <>
                    좋아요 <b>{data?.likeCnt}</b>
                  </>
                ) : (
                  '좋아요'
                )
              }
              onClick={handleLikeClick}
            />
          )}
          {data?.likeYn !== 'Y' && (
            <Button
              data-status={(tempHatesClicked || data?.hateYn === 'Y') && 'hates'}
              css={S.customButtonCss}
              variant="outline"
              size="smd"
              label={`${data?.hateCnt ? `싫어요 ${data?.likeCnt}` : '싫어요'}`}
              onClick={handleHateClick}
            />
          )}
        </S.ContentsReactBtnGroup>
      </S.Contents>
    </S.ContentSection>
  )
}

export default Contents
