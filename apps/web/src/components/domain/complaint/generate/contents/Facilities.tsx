// import { RadioButton } from '@ahhachul/ui'
// import { useState, useEffect } from 'react'

// import * as S from './styled'
// import { useComplaintContext } from '@/components/screens/ScreenComplaintDetail'

// const radioOptions = [
//   { key: '토사물', value: '토사물' },
//   { key: '오물', value: '오물' },
//   { key: '환기요청', value: '환기요청' },
// ]

// export default function Facilities() {
//   const { setMessage } = useComplaintContext()

//   const [type, setType] = useState('')
//   const [contents, setContents] = useState('')

//   useEffect(() => {
//     if (!type || !contents) {
//       setMessage('')
//       return
//     }
//     setMessage(`신고유형: ${type}/ 신고내용: ${contents}`)
//   }, [type, contents])

//   return (
//     <S.Container>
//       <article>
//         <S.Title>신고유형을 선택해주세요</S.Title>
//         <RadioButton
//           options={radioOptions}
//           onOptionChange={e => {
//             setType(e)
//           }}
//         />
//       </article>
//       <article>
//         <S.Title>내용</S.Title>
//         <S.TextArea
//           placeholder="신고내용을 작성해주세요"
//           onChange={e => {
//             setContents(e.target.value)
//           }}
//         />
//       </article>
//     </S.Container>
//   )
// }

export {};
