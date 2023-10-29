import { useRouter } from 'next/router'
import LostCarousel from './carousel/LostCarousel'
import ContentHeader from './contentHeader/ContentHeader'
import ContentInfo from './contentInfo/ContentInfo'
import * as S from './LostDetailContents.styled'
import { useFetchLostPostDetail } from '@/services'

export default function LostDetailContents() {
  const router = useRouter()
  const lostId = router.query.id as string

  const { data } = useFetchLostPostDetail(lostId)

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
