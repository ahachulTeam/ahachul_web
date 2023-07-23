import { useArrowKeyTrap, useDisclosure } from '@ahhachul/lib'
import { Button } from '@ahhachul/ui'
import { Controller } from 'react-hook-form'
import { useCategoryType } from '../hooks/useCategoryType'
import * as S from './styled'
import { ArrowIcon } from '@/assets/icons'
import { BottomSheet } from '@/components/common'
import { COMMUNITY_CATEGORY_FILTER } from '@/constants/community'

export default function CategoryFilter() {
  const { dialogRef, isOpen, onOpen, onClose } = useDisclosure()

  const { handleKeyListener } = useArrowKeyTrap(dialogRef)

  const {
    errors,
    control,
    tempCategoryType,
    isFilterSubmitClicked,
    selectedCategoryType,
    handleCategoryTypeChange,
    handleOpenFilter,
    handleCloseFilter,
    handleFilterSubmit,
  } = useCategoryType(isOpen, onOpen, onClose)

  return (
    <>
      <S.TriggerBtn
        type="button"
        aria-haspopup="dialog"
        aria-controls="lines-filter"
        aria-expanded={isOpen}
        aria-selected={Boolean(selectedCategoryType)}
        aria-invalid={Boolean(errors?.subwayLineId?.message)}
        onClick={handleOpenFilter}
      >
        {selectedCategoryType ? (
          <span>{COMMUNITY_CATEGORY_FILTER.options.filter(item => item.value === selectedCategoryType)[0].label}</span>
        ) : (
          <span>어디서 일어난 일인가요?</span>
        )}
        <ArrowIcon />
      </S.TriggerBtn>
      <BottomSheet
        ref={dialogRef}
        id="category-filter"
        title="카테고리를 선택해주세요"
        isOpen={isOpen}
        closedCases={[isFilterSubmitClicked]}
        onClose={handleCloseFilter}
      >
        <S.OptionContainer role="menu" onKeyDown={handleKeyListener}>
          <Controller
            name="categoryType"
            control={control}
            rules={{ required: true }}
            render={() => (
              <S.Lines>
                {COMMUNITY_CATEGORY_FILTER.options.map(opt => (
                  <S.Option
                    key={opt.value}
                    role="menuitemradio"
                    aria-checked={opt.value === tempCategoryType}
                    onClick={handleCategoryTypeChange(tempCategoryType, opt.value)}
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
            disabled={!tempCategoryType}
            onClick={handleFilterSubmit}
          />
        </S.OptionContainer>
      </BottomSheet>
    </>
  )
}
