// import { useArrowKeyTrap, useMountedFocus } from '@ahhachul/lib'
// import { SearchInput } from '@ahhachul/ui'
// import { Tag } from '@ahhachul/ui'
// import { m } from 'framer-motion'
// import { useRef, type ComponentProps, type RefObject } from 'react'
// import { Pagination, Autoplay } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'

// import 'swiper/css'
// import 'swiper/css/grid'
// import 'swiper/css/pagination'

// import useSearchDrawer from './hooks/useSearchDrawer'
// import * as S from './styled'
// import { HASH_TAG_DUMMY_LIST, SEARCH_KEYWORD_DUMMY_LIST } from '@/assets/dummy/community'
// import { ArrowIcon } from '@/assets/icons'

// import { MotionPortal } from '@/components/common/portal'
// import { defaultFadeInVariants } from '@/constants/motions'
// interface Props extends ComponentProps<typeof MotionPortal> {
//   onClose: () => void
// }

// export const SearchDrawer = ({ isMounted, mode, onClose }: Props) => {
//   const recentKeywordRef = useRef<HTMLUListElement>(null)

//   const {
//     isLostPage,
//     searchValue,
//     searchSupporting,
//     searchValueToEmptyString,
//     closeDrawerAndDeleteSearchValue,
//     handleChangeSearchValue,
//     handleSearchHistoryValue,
//     handleHashTagValue,
//   } = useSearchDrawer(onClose)

//   const deleteSearchHistories = () => {}
//   const searchInputRef = useMountedFocus(isMounted)
//   const { handleKeyListener } = useArrowKeyTrap(recentKeywordRef, 'row')

//   return (
//     <MotionPortal isMounted={isMounted} mode={mode}>
//       <m.div css={S.overlayCss} initial="initial" animate="animate" exit="exit" variants={defaultFadeInVariants}>
//         <m.div css={S.contentCss} variants={S.searchDrawerVariants}>
//           <S.ModalHeader>
//             <S.IconBtn type="button" aria-label="뒤로가기 버튼" onClick={closeDrawerAndDeleteSearchValue}>
//               <ArrowIcon />
//             </S.IconBtn>
//             <SearchInput
//               ref={searchInputRef as RefObject<HTMLInputElement>}
//               label="검색"
//               value={searchValue}
//               onSearch={searchSupporting}
//               onDelete={searchValueToEmptyString}
//               onChange={handleChangeSearchValue}
//             />
//           </S.ModalHeader>

//           <S.SearchHistory>
//             <S.SearchHistoryHeader>
//               <span>최근 검색어</span>
//               <button type="button" onClick={deleteSearchHistories}>
//                 모두 지우기
//               </button>
//             </S.SearchHistoryHeader>
//             <S.SearchHistoryTagList ref={recentKeywordRef} role="menu" onKeyDown={handleKeyListener}>
//               {SEARCH_KEYWORD_DUMMY_LIST.map((data, i) => (
//                 // eslint-disable-next-line react/no-array-index-key
//                 <li key={i}>
//                   <Tag role="menuitem" label={data} variant="outline" onClick={handleSearchHistoryValue(data)} />
//                 </li>
//               ))}
//             </S.SearchHistoryTagList>
//           </S.SearchHistory>

//           {!isLostPage && (
//             <S.Hashtag>
//               <S.HashtagHeader>
//                 <span>인기 해쉬태그</span>
//                 <p>20:43 기준</p>
//               </S.HashtagHeader>
//               <S.HastTagList>
//                 <Swiper
//                   slidesPerView={1}
//                   slidesPerGroup={1}
//                   spaceBetween={30}
//                   pagination={{
//                     clickable: true,
//                   }}
//                   autoplay={{
//                     delay: 4000,
//                     disableOnInteraction: false,
//                   }}
//                   modules={[Pagination, Autoplay]}
//                 >
//                   {HASH_TAG_DUMMY_LIST.map((tags, idx) => (
//                     <SwiperSlide key={idx}>
//                       {tags.map((tag, i) => (
//                         <S.GridItem key={i} onClick={handleHashTagValue(tag)}>
//                           <span>{idx === 0 ? i + 1 : i + 7}</span>
//                           <span>{`#${tag}`}</span>
//                           <span>{'-'}</span>
//                         </S.GridItem>
//                       ))}
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               </S.HastTagList>
//             </S.Hashtag>
//           )}
//         </m.div>
//       </m.div>
//     </MotionPortal>
//   )
// }

export {};
