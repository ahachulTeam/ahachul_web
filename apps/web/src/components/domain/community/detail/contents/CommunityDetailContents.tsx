import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import * as S from './styled'
import { MessageCircleIcon, ThumbsUpIcon } from '@/assets/icons'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import useCommunityDetailQuery from '@/queries/community/useCommunityDetailQuery'
import { useManagementCommunityPostReacting } from '@/queries/community/useCommunityPostLikes'

interface DetailContentsProps {
  isAuth: boolean
  onLoginBottomSheetOpen: VoidFunction
}

function CommunityDetailContents({ isAuth, onLoginBottomSheetOpen }: DetailContentsProps) {
  const router = useRouter()
  const { query } = router

  const { data: articleDetail } = useCommunityDetailQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  const { getToggleLike } = useManagementCommunityPostReacting()

  const handleLikeClick = () => {
    if (!isAuth) {
      onLoginBottomSheetOpen()
      return
    }
    const toggleLike = getToggleLike(articleDetail?.likeYn)
    const req = { postId: Number(router.query?.id) }

    toggleLike(req)
  }

  const searchHashTag = useCallback(
    (value: string) => () => {
      router.push(
        {
          pathname: PATH.COMMUNITY,
          query: { hashTag: value },
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
                <Tag css={S.customTagCss} label={`#${tag}`} variant="ghost" onClick={searchHashTag(tag)} />
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
            <>
              <ThumbsUpIcon /> <span>좋아요 {articleDetail?.likeCnt !== 0 && <b>{articleDetail?.likeCnt}</b>}</span>
            </>
          }
          onClick={handleLikeClick}
        />
        <Button
          css={S.customButtonCss}
          variant="outline"
          size="smd"
          label={
            <>
              <MessageCircleIcon />
              <span>{articleDetail?.hateCnt ? `댓글 ${articleDetail?.hateCnt}` : '댓글'}</span>
            </>
          }
        />
      </S.ContentsReactBtnGroup>
    </>
  )
}

export default CommunityDetailContents
