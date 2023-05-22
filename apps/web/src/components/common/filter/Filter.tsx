import { useRef, useEffect } from 'react'
import { BottomSheet } from '../bottomSheet'
import * as S from './styled'
import { ArrowDownMinIcon } from '@/assets/icons'
import { useDisclosure, useArrowKeyTrap } from '@/hooks'

interface FilterItem {
  label: string
  value: string
}

interface FilterProps {
  id: string
  label: string
  options: readonly FilterItem[]
  value: string
  chnageValue: (option: string) => void
}

export default function Filter({ id, label, options, value, chnageValue }: FilterProps) {
  const { dialoglRef, isOpen, onOpen, onClose } = useDisclosure()
  const prevValue = useRef(value)

  const uid = `${id}-filter`

  const { handleKeyListener } = useArrowKeyTrap(dialoglRef)

  const handleOptionClick = (option: string) => () => {
    chnageValue(option)
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
        {label}
        <ArrowDownMinIcon />
      </S.TriggerBtn>
      <BottomSheet
        ref={dialoglRef}
        id={uid}
        isOpen={isOpen}
        title={label}
        closedCases={[prevValue.current !== value]}
        onClose={onClose}
      >
        <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
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
        </S.OptionContainer>
      </BottomSheet>
    </>
  )
}
