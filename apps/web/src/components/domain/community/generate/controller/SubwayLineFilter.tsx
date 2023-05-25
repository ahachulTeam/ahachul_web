import { useArrowKeyTrap, useDisclosure } from '@ahhachul/lib'
import { Button } from '@ahhachul/ui'
import { useState } from 'react'
import { Control, Controller, ControllerRenderProps } from 'react-hook-form'
import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { BottomSheet } from '@/components/common'
import { CreateArticleQueryModel } from '@/types/community'

const SUBWAY_LINE_FILTER = {
  id: 'lines',
  label: '호선',
  options: [
    // temporarily
    { label: '1호선', value: '64' },
    { label: '2호선', value: '65' },
    { label: '3호선', value: '66' },
    { label: '4호선', value: '67' },
    { label: '5호선', value: '68' },
    { label: '6호선', value: '69' },
    { label: '7호선', value: '70' },
    { label: '8호선', value: '71' },
    { label: '9호선', value: '72' },
  ],
} as const

interface SubwayLineFilterProps {
  control: Control<CreateArticleQueryModel>
}

export const SubwayLineFilter = ({ control }: SubwayLineFilterProps) => {
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure()

  const { handleKeyListener } = useArrowKeyTrap(dialoglRef)

  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [isSubmitClicked, setIsSubmitClicked] = useState(false)

  const handleOpenFilter = () => {
    setIsSubmitClicked(false)
    onOpen()
  }

  const handleOptionClick =
    (field: ControllerRenderProps<CreateArticleQueryModel, 'subwayLineId'>, value: string) => () => {
      if (selected === value) {
        field.onChange(undefined)
        setSelected(undefined)
      } else {
        field.onChange(value)
        setSelected(value)
      }
    }

  const handleSubmitFilter = () => {
    setIsSubmitClicked(true)
  }

  return (
    <>
      <S.TriggerBtn
        type="button"
        aria-haspopup="dialog"
        aria-controls="lines-filter"
        aria-expanded={isOpen}
        aria-selected={Boolean(selected)}
        onClick={handleOpenFilter}
      >
        {selected ? (
          <span>{SUBWAY_LINE_FILTER.options.filter(item => item.value === selected)[0].label}</span>
        ) : (
          <span>어디서 일어난 일인가요?</span>
        )}
        <ArrowIcon />
      </S.TriggerBtn>
      <BottomSheet
        ref={dialoglRef}
        id="lines-filter"
        isOpen={isOpen}
        title="커뮤니티 호선을 선택해주세요"
        closedCases={[isSubmitClicked]}
        onClose={onClose}
      >
        <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
          <S.Lines>
            {SUBWAY_LINE_FILTER.options.map(opt => (
              <Controller
                key={opt.value}
                name="subwayLineId"
                control={control}
                render={({ field }) => (
                  <S.Option
                    key={opt.value}
                    role="menuitemradio"
                    aria-checked={opt.value === selected}
                    onClick={handleOptionClick(field, opt.value)}
                  >
                    {opt.label}
                  </S.Option>
                )}
              />
            ))}
          </S.Lines>
          <Button
            label="선택하기"
            type="button"
            size="md"
            variant="primary"
            disabled={Boolean(!selected)}
            onClick={handleSubmitFilter}
          />
        </S.OptionContainer>
      </BottomSheet>
    </>
  )
}
