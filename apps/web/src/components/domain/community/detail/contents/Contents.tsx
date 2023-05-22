import { getCurrentTime } from '@ahhachul/lib'
import { useRouter } from 'next/router'
import * as S from './styled'
import { TagBtn } from '@/components/common'
import { PATH } from '@/constants'
import { CommunityDetailModel } from '@/types/community'

interface ContentsProps {
  data: CommunityDetailModel
}

function Contents({ data }: ContentsProps) {
  const router = useRouter()

  const searchHashTag = (value: string) => () => {
    router.push({
      pathname: PATH.COMMUNITY,
      query: { tags: value },
    })
  }

  return (
    <S.Contents>
      <S.Title>{data.title}</S.Title>
      <S.FragmentInfos>
        <div>
          <span>{getCurrentTime(data.time)}</span>
          <span>{data.author}</span>
        </div>
        <div>
          <span>조회 {data.viewCnt}</span>
          <span>댓글 {data.commentCnt}</span>
          <span>좋아요 {data.likeCnt}</span>
        </div>
      </S.FragmentInfos>
      <S.ImageBox>{/* <Image src={data.img_url || thumbnailDefaultImg} alt="" priority fill /> */}</S.ImageBox>
      <S.DetailInfo>{data.content}</S.DetailInfo>
      <S.HashTagList>
        {data.hashtags.map((tag, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>
              <TagBtn label={`#${tag}`} variant="primary" onClick={searchHashTag(tag)} />
            </li>
          )
        })}
      </S.HashTagList>
      <S.ContentsReactBtnGroup>
        <button type="button">좋아요</button>
        <button type="button">싫어요</button>
      </S.ContentsReactBtnGroup>
    </S.Contents>
  )
}

export default Contents
