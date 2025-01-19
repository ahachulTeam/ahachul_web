import { css } from '@emotion/react';

import { objectEntries } from '@ahhachul/utils';

import * as S from './Select.styled';

interface SelectListProps {
  selectedOption: string;
  options: Record<string, string>;
  isError?: boolean;
  overrideCss?: ReturnType<typeof css>;
  onChange: (value: string) => void;
}

const SelectList = ({
  selectedOption,
  options,
  isError,
  overrideCss,
  onChange,
}: SelectListProps) => {
  return (
    <S.ScrollContainer css={overrideCss}>
      {objectEntries(options).map(([key, val]) => {
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
