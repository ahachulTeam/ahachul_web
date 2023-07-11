import { useArrowKeyTrap, useDisclosure } from '@ahhachul/lib'
import { Button } from '@ahhachul/ui'
import { Controller } from 'react-hook-form'
import { useSubwayLine } from './hooks/useSubwayLine'
import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { BottomSheet } from '@/components/common'
import { SUBWAY_LINE_FILTER } from '@/constants/subway'

export const SubwayLineFilter = () => {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  const { handleKeyListener } = useArrowKeyTrap(dialogRef)

  const {
    errors,
    control,
    tempSelectedLine,
    selectedSubwayLine,
    isFilterSubmitClicked,
    handleSubwayLineChange,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterSubmit,
  } = useSubwayLine(isOpen, onOpen, onClose)

  return (
    <>
      <S.TriggerBtn
        type="button"
        aria-haspopup="dialog"
        aria-controls="lines-filter"
        aria-expanded={isOpen}
        aria-selected={Boolean(selectedSubwayLine)}
        onClick={handleOpenFilter}
      >
        {selectedSubwayLine ? (
          <span>{SUBWAY_LINE_FILTER.options.filter(item => item.value === selectedSubwayLine)[0].label}</span>
        ) : (
          <span>호선</span>
        )}
        <ArrowIcon />
      </S.TriggerBtn>
      <BottomSheet
        ref={dialogRef}
        id="lines-filter"
        title="커뮤니티 호선을 선택해주세요"
        isOpen={isOpen}
        closedCases={[isFilterSubmitClicked]}
        onClose={handleCloseFilter}
      >
        <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
          <Controller
            name="subwayLineId"
            control={control}
            render={() => (
              <S.Lines>
                {SUBWAY_LINE_FILTER.options.map(opt => (
                  <S.Option
                    key={opt.value}
                    role="menuitemradio"
                    aria-checked={opt.value === tempSelectedLine}
                    onClick={handleSubwayLineChange(tempSelectedLine, opt.value)}
                  >
                    {opt.label}
                  </S.Option>
                ))}
              </S.Lines>
            )}
          />
          <Button
            label="선택하기"
            type="button"
            size="md"
            variant="primary"
            disabled={!tempSelectedLine}
            onClick={handleFilterSubmit}
          />
        </S.OptionContainer>
      </BottomSheet>
    </>
  )
}
