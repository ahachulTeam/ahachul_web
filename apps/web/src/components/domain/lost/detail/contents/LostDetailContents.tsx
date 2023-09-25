import { useRouter } from 'next/router'
import LostCarousel from './carousel/LostCarousel'
import ContentHeader from './contentHeader/ContentHeader'
import ContentInfo from './contentInfo/ContentInfo'
import * as S from './LostDetailContents.styled'

import { useFetchLostDetail } from '@/queries/lost'

export default function LostDetailContents() {
  const router = useRouter()
  const lostId = router.query.id as string

  const { data } = useFetchLostDetail(lostId)

  return (
    <article>
      <LostCarousel images={data?.images ?? []} />
      <S.Content>
        <ContentHeader data={data} />
        <ContentInfo data={data} />
      </S.Content>
    </article>
  )
}
