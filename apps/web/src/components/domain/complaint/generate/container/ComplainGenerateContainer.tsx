import {
  useEffect,
  useMemo,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'

import { useRouter } from 'next/router'
import * as S from './ComplainGenerateContainer.styled'
import { Announcement, Facilities, Impediment, Patient, Sexual, Temperature, Violence } from '../contents'

import { SwitchCase, Button } from '@ahhachul/ui'
import { useNavigationBar } from '@/hooks'
import { css } from '@emotion/react'
import { QuestionIcon } from '@/assets/icons'

import { useGetTrainMetaData } from '@/queries/train/useGetTrainMetaData'
import { TrainMetaData } from '@/types/train'
import { useToast } from '@/hooks'
import { usePostComplaintMessage } from '@/queries/complaint/usePostComplaintMessage'

const ComplaintContentsKeys = {
  facilities: '시설 · 환경민원',
  temperature: '온도조절',
  announcement: '안내방송',
  impediment: '질서저해',
  patient: '응급환자',
  sexual: '성추행',
  violence: '폭력',
}

const ComplaintContext = createContext({} as { message: string; setMessage: Dispatch<SetStateAction<string>> })

export const useComplaintContext = () => {
  return useContext(ComplaintContext)
}

export const ComplainGenerateContainer = () => {
  const toast = useToast()
  const router = useRouter()

  const { isOpenNavigationBar } = useNavigationBar()

  const [message, setMessage] = useState('')

  const [trainNumber, setTrainNumber] = useState<TrainMetaData | null>(null)
  const [isEnabledFetch, setIsEnabledFetch] = useState(false)

  const [inputValues, setInputValues] = useState(['', '', '', ''])
  const inputRefs = useRef<null | HTMLInputElement[]>(new Array(inputValues.length))

  const trainsNumberInputResult = useMemo(() => {
    if (inputValues.some(item => String(item) === 'NaN')) {
      return ''
    }
    return inputValues.join('')
  }, [inputValues])

  const selectedComplaint = useMemo(() => {
    return router.query.id as keyof typeof ComplaintContentsKeys
  }, [router.query])

  const {
    data: trainMetaData,
    isError,
    isFetched,
  } = useGetTrainMetaData(trainsNumberInputResult || '', {
    enabled: !!trainsNumberInputResult && trainsNumberInputResult.length === inputValues.length && isEnabledFetch,
    suspense: false,
    staleTime: 0,
  })

  const { mutateAsync } = usePostComplaintMessage()

  const handleKeyDownTrainNumber = (e: KeyboardEvent, index: number) => {
    if (!inputRefs.current) return

    if (e.key === '-' || e.key === '+' || e.key === '.') {
      setInputValues(prev => {
        const newInputValues = [...prev]
        newInputValues[index] = 'NaN'
        return newInputValues
      })
    }

    if (e.key === 'Backspace') {
      setTimeout(() => {
        if (inputRefs.current && inputRefs.current[index - 1] !== undefined) {
          inputRefs.current[index - 1].focus()
        }
      }, 0)
    }
  }

  const handleChangeTrainNumber = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (!inputRefs.current) return

    const { value } = e.target
    const { inputType } = e.nativeEvent as InputEvent

    if (inputType === 'deleteContentBackward') {
      setInputValues(prev => {
        const newInputValues = [...prev]
        newInputValues[index] = ''
        return newInputValues
      })

      if (inputRefs.current[index - 1] !== undefined) {
        inputRefs.current[index - 1].focus()
      }
      return
    }

    if (!/^[0-9]$/.test(value)) {
      if (value.length === 2 && inputRefs.current[index + 1] !== undefined) {
        setInputValues(prev => {
          const newInputValues = [...prev]
          newInputValues[index + 1] = value[1]
          return newInputValues
        })

        if (inputRefs.current[index + 1] !== undefined) {
          inputRefs.current[index + 1].focus()
        }
      }

      return
    }

    setInputValues(prev => {
      const newInputValues = [...prev]
      newInputValues[index] = value
      return newInputValues
    })

    if (inputRefs.current[index + 1] !== undefined) {
      inputRefs.current[index + 1].focus()
    }
  }

  useEffect(() => {
    if (Object.keys(ComplaintContentsKeys).findIndex(item => item === String(router.query.id)) === -1) {
      router.push('/complaint', undefined, { shallow: true })
    }
  }, [router])

  // useEffect(() => {
  //   setIsEnabledFetch(false)
  //   if (isError && isEnabledFetch) {
  //     toast.error('열차번호를 확인해주세요.')
  //     return
  //   }

  //   if (trainMetaData) {
  //     setTrainNumber(trainMetaData)
  //   }
  // }, [trainMetaData, isError, isFetched])

  useEffect(() => {
    setIsEnabledFetch(false)
    if (isFetched) {
      setTrainNumber({
        id: 1,
        subwayLine: {
          id: 1,
          name: '1호선',
        },
        location: 3,
        organizationTrainNo: '52',
      })
    }
  }, [trainMetaData, isError, isFetched])

  useEffect(() => {
    if (inputRefs.current) {
      inputRefs.current[0].focus()
    }
  }, [inputRefs.current])

  if (trainNumber === null) {
    return (
      <S.Container
        css={css`
          padding: 32px 15px;
        `}
      >
        <S.TrainNumberInfo>
          <span>정확한 민원 접수를 위해</span>
          <span>
            <b> 열차번호</b>를 입력해주세요.
          </span>
        </S.TrainNumberInfo>
        <S.InputWrapper>
          {inputValues.map((value, index) => (
            <S.TrainNumberInput
              key={index}
              type="number"
              value={value}
              onKeyDown={e => handleKeyDownTrainNumber(e, index)}
              onChange={e => handleChangeTrainNumber(e, index)}
              ref={element => {
                if (!inputRefs.current || !element) return
                inputRefs.current[index] = element
              }}
            />
          ))}
        </S.InputWrapper>
        <S.Question>
          <QuestionIcon />
          <span>열차번호는 어디에 있나요?</span>
        </S.Question>
        <S.StickyArea $isOpenNavigationBar={isOpenNavigationBar}>
          <Button
            label="다음"
            size="md"
            variant="primary"
            type="button"
            disabled={trainsNumberInputResult.length !== inputValues.length}
            onClick={() => {
              setIsEnabledFetch(true)
            }}
          />
        </S.StickyArea>
      </S.Container>
    )
  }

  return (
    <>
      <S.Container>
        <S.지하철정보>
          <span>
            <b>{trainNumber.subwayLine.name}</b> {trainNumber.id}열차
            {trainNumber.organizationTrainNo}호차
          </span>
          {/* <p>대화행</p> */}
        </S.지하철정보>
        <S.진짜콘텐츠>
          <ComplaintContext.Provider value={{ message, setMessage }}>
            <SwitchCase
              value={selectedComplaint}
              caseBy={{
                facilities: <Facilities />,
                temperature: <Temperature />,
                announcement: <Announcement />,
                impediment: <Impediment />,
                patient: <Patient />,
                sexual: <Sexual />,
                violence: <Violence />,
              }}
            />
          </ComplaintContext.Provider>
        </S.진짜콘텐츠>
      </S.Container>
      <S.StickyArea $isOpenNavigationBar={isOpenNavigationBar}>
        <Button
          label="접수하기"
          size="md"
          variant="primary"
          type="button"
          disabled={message === ''}
          onClick={() => {
            mutateAsync({
              params: {
                content: message,
                phoneNumber: '010-0000-0000', // 필수?
                subwayLineId: trainMetaData?.subwayLine.id ?? 1,
                trainNo: trainsNumberInputResult,
              },
            })
          }}
        />
      </S.StickyArea>
    </>
  )
}
