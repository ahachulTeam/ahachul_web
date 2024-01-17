// import { useArrowKeyTrap, useDisclosure } from '@ahhachul/lib'
// import { Button } from '@ahhachul/ui'
// import { Controller } from 'react-hook-form'
// import { useSubwayLine } from '../hooks/useSubwayLine'
// import * as S from './styled'
// import { ArrowIcon } from '@/assets/icons'
// import { BottomSheet } from '@/components/common'
// import { SUBWAY_LINE_FILTER } from '@/constants/subway'

// export const SubwayLineFilter = () => {
//   const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

//   const { handleKeyListener } = useArrowKeyTrap(dialogRef)

//   const {
//     errors,
//     control,
//     tempSelectedLine,
//     selectedSubwayLine,
//     isFilterSubmitClicked,
//     handleSubwayLineChange,
//     handleOpenFilter,
//     handleCloseFilter,
//     handleFilterSubmit,
//   } = useSubwayLine(isOpen, onOpen, onClose)

//   return (
//     <>
//       <S.TriggerBtn
//         type="button"
//         aria-haspopup="dialog"
//         aria-controls="lines-filter"
//         aria-expanded={isOpen}
//         aria-selected={Boolean(selectedSubwayLine)}
//         aria-invalid={Boolean(errors?.subwayLineId?.message)}
//         onClick={handleOpenFilter}
//       >
//         {selectedSubwayLine ? (
//           <span>{SUBWAY_LINE_FILTER.options.filter(item => item.value === selectedSubwayLine)[0].label}</span>
//         ) : (
//           <span>습득하신 호선을 추가하세요</span>
//         )}
//         <ArrowIcon />
//       </S.TriggerBtn>
//       <BottomSheet
//         ref={dialogRef}
//         id="lines-filter"
//         title="커뮤니티 호선을 선택해주세요"
//         isOpen={isOpen}
//         closedCases={[isFilterSubmitClicked]}
//         onClose={handleCloseFilter}
//       >
//         <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
//           <Controller
//             name="subwayLineId"
//             control={control}
//             // Portal을 사용하고 있어서 form 태그 내부가 아님, rules가 동작 하지 않아요
//             rules={{ required: true }} // 🥹🥹
//             // 이를 위해 BottomSheet를 Portal을 사용하지 않고 사용하는 방법과
//             // useForm 훅 내부에서 직접 에러 상태 관리를 해줘야해요
//             render={() => (
//               <S.Lines>
//                 {SUBWAY_LINE_FILTER.options.map(opt => (
//                   <S.Option
//                     key={opt.value}
//                     role="menuitemradio"
//                     aria-checked={opt.value === Number(tempSelectedLine)}
//                     onClick={handleSubwayLineChange(tempSelectedLine, String(opt.value))}
//                   >
//                     {opt.label}
//                   </S.Option>
//                 ))}
//               </S.Lines>
//             )}
//           />
//           <Button
//             label="선택하기"
//             type="button"
//             size="md"
//             variant="primary"
//             disabled={!tempSelectedLine}
//             onClick={handleFilterSubmit}
//           />
//         </S.OptionContainer>
//       </BottomSheet>
//     </>
//   )
// }

// /**
//  * @description 일반적인 상황에서는 <Controller render={({ field }) => ()} /> 와 같이 사용해서 바로 formState 조작을 해줄 수 있어요, 다만 도메인 로직과 상이해서 위와 같은 코드를 구현했어요
//  */
// // const handleLineFieldChange =
// //   (field: ControllerRenderProps<CreateArticleQueryModel, 'subwayLineId'>, prevVal: string, currentVal: string) =>
// //   () =>
// //     prevVal !== currentVal ? field.onChange(currentVal) : field.onChange('')

export {};
