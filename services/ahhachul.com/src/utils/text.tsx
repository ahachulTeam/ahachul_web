import { css } from '@emotion/react';

export const applyHighlight = (searchValue: string, suggestion: string) => {
  const index = suggestion.indexOf(searchValue);
  if (index !== -1) {
    const start = suggestion.slice(0, index);
    const match = suggestion.slice(index, index + searchValue.length);
    const end = suggestion.slice(index + searchValue.length);

    return (
      <>
        {start}
        <span
          css={css`
            color: var(--ah-color-key-color);
            font-weight: 600;
          `}
        >
          {match}
        </span>
        {end}
      </>
    );
  }

  return suggestion;
};
