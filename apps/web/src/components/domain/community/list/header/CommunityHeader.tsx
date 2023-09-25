import { useDisclosure } from '@ahhachul/lib'
import { css } from '@emotion/react'
import { Autoplay, EffectFade, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SearchDrawer } from '@/components/common'
import { Header } from '@/components/layout'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { useGetHottestHashtagsQuery } from '@/queries/global/hot-hashtags'

export const CommunityHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: hotHashTags } = useGetHottestHashtagsQuery()

  return (
    <>
      <Header
        title="지하철 커뮤니티 아하철"
        invisibleTitle
        invisibleLeftIcon
        hasLogo={false}
        hasBorder={false}
        css={customHeaderCss}
      >
        <Header.SearchBarWithRankingHashtags onClick={onOpen}>
          <Swiper
            direction={'vertical'}
            modules={[Pagination, EffectFade, Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {hotHashTags?.ranks?.map((hashTag, i) => (
              <SwiperSlide key={i}>
                {i + 1} #{hashTag}
              </SwiperSlide>
            ))}
          </Swiper>
        </Header.SearchBarWithRankingHashtags>
        <Header.Alarm />
      </Header>
      <SearchDrawer isMounted={isOpen} onClose={onClose} />
    </>
  )
}

const customHeaderCss = css`
  & > div {
    width: 100%;
    flex-grow: 1;

    > div {
      box-sizing: border-box;
      width: 100%;
    }
  }
`
