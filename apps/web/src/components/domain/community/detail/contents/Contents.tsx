import { getCurrentTime } from '@ahhachul/lib'
import { Button, Tag } from '@ahhachul/ui'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useCallback } from 'react'
import * as S from './styled'
import { ARTICLE_DEFAULT_THUMBNAIL, PATH } from '@/constants'
import { CommunityDetailModel } from '@/types/community'

interface ContentsProps {
  data?: CommunityDetailModel
}

function Contents({ data }: ContentsProps) {
  const router = useRouter()

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
      {data?.images?.map(img => (
        <S.ImageBox key={img?.imageId}>
          <p>
            <Image src={img?.imageUrl || ARTICLE_DEFAULT_THUMBNAIL} alt="" priority fill />
          </p>
        </S.ImageBox>
      ))}
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
        <Button variant="secondary" size="smd" label="싫어요" />
        <Button variant="primary" size="smd" label="좋아요" />
      </S.ContentsReactBtnGroup>
    </S.Contents>
  )
}

export default Contents
