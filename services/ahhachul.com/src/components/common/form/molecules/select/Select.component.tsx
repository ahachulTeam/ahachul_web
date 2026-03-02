import { useMemo, useState } from 'react';

import { css } from '@emotion/react';

import { objectEntries } from '@ahhachul/utils';

import * as S from './Select.styled';

type SelectRenderVariant = 'chips' | 'searchable';

interface SelectListProps {
  selectedOption?: string;
  options: Record<string, string>;
  isError?: boolean;
  overrideCss?: ReturnType<typeof css>;
  variant?: SelectRenderVariant;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onChange: (value: string) => void;
}

const SelectList = ({
  selectedOption,
  options,
  isError,
  overrideCss,
  variant = 'chips',
  searchPlaceholder = '역 이름 검색',
  emptyMessage = '검색 결과가 없습니다.',
  onChange,
}: SelectListProps) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const selectedLabel = selectedOption ? options[selectedOption] : '';

  const optionEntries = useMemo(() => objectEntries(options), [options]);
  const filteredOptions = useMemo(() => {
    if (variant !== 'searchable') {
      return optionEntries;
    }

    const normalizedKeyword = searchKeyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return optionEntries;
    }

    return optionEntries.filter(([, value]) => value.toLowerCase().includes(normalizedKeyword));
  }, [optionEntries, searchKeyword, variant]);

  if (variant === 'searchable') {
    return (
      <S.SearchableContainer css={overrideCss}>
        <S.SelectedStationText>{selectedLabel || '역을 선택해주세요.'}</S.SelectedStationText>
        <S.SearchInput
          type="text"
          value={searchKeyword}
          placeholder={searchPlaceholder}
          onChange={event => setSearchKeyword(event.target.value)}
        />
        <S.SearchResultsWrapper>
          {filteredOptions.length ? (
            filteredOptions.map(([key, val]) => {
              const isActive = selectedOption === key;

              return (
                <S.SearchResultButton
                  id={key}
                  key={key}
                  type="button"
                  isActive={isActive}
                  isError={isError}
                  onClick={() => {
                    onChange(key);
                    setSearchKeyword('');
                  }}
                >
                  {val}
                </S.SearchResultButton>
              );
            })
          ) : (
            <S.EmptyText>{emptyMessage}</S.EmptyText>
          )}
        </S.SearchResultsWrapper>
      </S.SearchableContainer>
    );
  }

  return (
    <S.ScrollContainer css={overrideCss}>
      {optionEntries.map(([key, val]) => {
        const isActive = selectedOption === key;

        return (
          <S.SelectButton
            id={key}
            key={key}
            type="button"
            isActive={isActive}
            isError={isError}
            onClick={() => onChange(key)}
          >
            {val}
          </S.SelectButton>
        );
      })}
    </S.ScrollContainer>
  );
};

export default SelectList;
