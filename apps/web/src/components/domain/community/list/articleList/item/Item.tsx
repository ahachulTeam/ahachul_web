import { getCurrentTime } from '@ahhachul/lib'
import Image from 'next/image'
import Link from 'next/link'

import * as S from './styled'

interface ItemProps {
  data: {
    _id: number
    title: string
    img_url: string | null
    content: string
    author: string
    likeCnt: number
    comment: number
    time: string
  }
}

function Item({ data }: ItemProps) {
  return (
    <S.Item>
      <article>
        <Link href={`community/${data._id}`}>
          <S.Flex>
            <h4>{data.title}</h4>
            <p>{data.content}</p>
            <S.Box>
              <span>{getCurrentTime(data.time)}</span>
              <span>{data.author}</span>
            </S.Box>
          </S.Flex>
          <S.Thumbnail>
            <Image src={'/images/default_thumbnail.svg'} fill alt="community item thumbnail" />
          </S.Thumbnail>
        </Link>
      </article>
    </S.Item>
  )
}

export default Item
