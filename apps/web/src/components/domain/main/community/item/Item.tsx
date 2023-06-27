import { Badge } from '@ahhachul/ui'
import Image from 'next/image'
import Link from 'next/link'

import * as S from './styled'

interface ItemProps {
  data: {
    _id: number
    title: string
    content: string
    likeCnt: string
    commentCnt: string
    subwayLine: string
    time: string
    category: string
  }
}

function Item({ data }: ItemProps) {
  return (
    <S.Item>
      <Link href={`community/${data._id}`}>
        <S.Flex>
          <h4>{data.title}</h4>
          <p>{data.content}</p>
          <S.Box>
            <Badge label={data.subwayLine} isHottest />
          </S.Box>
        </S.Flex>
        <S.Thumbnail>
          <Image src={'/images/default_thumbnail.svg'} fill alt="community item thumbnail" />
        </S.Thumbnail>
      </Link>
    </S.Item>
  )
}

export default Item
