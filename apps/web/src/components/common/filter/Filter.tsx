import { useDisclosure, useArrowKeyTrap } from '@ahhachul/lib'
import { useRef, useEffect, useMemo } from 'react'
import { BottomSheet } from '../bottomSheet'
import * as S from './styled'
import { ArrowDownMinIcon } from '@/assets/icons'

interface FilterItem {
  label: string
  value: string
}

interface FilterProps {
  id: string
  label: string
  options: readonly FilterItem[]
  value: string
  changeValue: (option: string) => void
  className?: string
}

export default function Filter({ id, label, options, value, className, changeValue }: FilterProps) {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()
  const prevValue = useRef(value)

  const selectedOptionLabel = useMemo(() => {
    const selectedOption = options.find(option => option.value === value)

    if (selectedOption) {
      return selectedOption.label
    } else {
      return label
    }
  }, [label, options, value])

  const uid = `${id}-filter`

  const { handleKeyListener } = useArrowKeyTrap(dialogRef)

  const handleOptionClick = (option: string) => () => {
    changeValue(option)
  }

  useEffect(() => {
    prevValue.current = value
  }, [value])

  return (
    <>
      <S.TriggerBtn
        type="button"
        aria-haspopup="dialog"
        aria-controls={uid}
        aria-expanded={isOpen}
        aria-selected={Boolean(value)}
        onClick={onOpen}
      >
        {selectedOptionLabel}
        <ArrowDownMinIcon />
      </S.TriggerBtn>
      <BottomSheet
        ref={dialogRef}
        id={uid}
        isOpen={isOpen}
        title={label}
        closedCases={[prevValue.current !== value]}
        className={className}
        onClose={onClose}
      >
        <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
          <>
            {id === 'subwayLineId' ? (
              <S.Lines>
                {options.map(opt => (
                  <S.SubwayOption
                    key={opt.value}
                    role="menuitemradio"
                    aria-checked={opt.value === value}
                    onClick={handleOptionClick(opt.value)}
                  >
                    {opt.label}
                  </S.SubwayOption>
                ))}
              </S.Lines>
            ) : (
              <>
                {options.map(opt => (
                  <S.Option
                    key={opt.value}
                    role="menuitemradio"
                    aria-checked={opt.value === value}
                    onClick={handleOptionClick(opt.value)}
                  >
                    {opt.label}
                  </S.Option>
                ))}
              </>
            )}
          </>
        </S.OptionContainer>
      </BottomSheet>
    </>
  )
}
