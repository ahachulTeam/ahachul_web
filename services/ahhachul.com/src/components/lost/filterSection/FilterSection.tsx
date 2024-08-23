import React, { useReducer, useState } from 'react';
import { CSSObject, Theme } from '@emotion/react';
import { UiComponent } from 'components';
import IconChevron from 'shared/static/icons/system/IconChevron';
import { f } from 'shared/style';
import { Nullable } from 'types';
import { exportLineNameWithSubwayLineId } from 'utils/export';

const FilterSection = () => {
  let hasConditions = false;

  const [subwayLineId, setSubwayLineId] = useState(null);
  const [show, toggle] = useReducer((c) => !c, false);
  const handleSubwayLine = (subwayLine: Nullable<string>) => {
    if (!subwayLine) {
      setSubwayLineId(null);
    } else {
      setSubwayLineId(subwayLine);
    }
  };

  return (
    <>
      <section css={wrap}>
        <ul css={ul(hasConditions)}>
          <li>
            <button css={filterBtn(Boolean(subwayLineId))} onClick={toggle}>
              {subwayLineId ? exportLineNameWithSubwayLineId(subwayLineId) : '호선'}
              <IconChevron />
            </button>
          </li>
        </ul>
      </section>
      <UiComponent.SubwayLineBottomSheet
        isShowing={show}
        subwayLineId={subwayLineId}
        onClose={toggle}
        handleSubwayLine={handleSubwayLine}
      />
    </>
  );
};

const wrap = [
  f.fullWidth,
  f.sideGutter,
  {
    marginBottom: '16px',
  },
];

const ul = (hasConditions: boolean): [CSSObject[], CSSObject, CSSObject] => [
  f.flexAlignCenter,
  f.overflowScroll,
  {
    overflowY: 'hidden',
    overflowX: 'scroll',
    justifyContent: hasConditions ? 'flex-start' : 'flex-end',
    gap: '8px',
  },
];

const filterBtn =
  (hasCondition: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    flexShrink: 0,
    border: '1px solid rgb(196, 212, 252, 0.47)',
    height: '30px',
    borderRadius: '124px',
    padding: '0 10px 0 14px',
    width: 'max-content',
    color: 'rgb(196, 212, 252)',
    fontSize: fontSize[12],
    fontWeight: hasCondition ? fontWeight[700] : fontWeight[600],
    transition: 'opacity 0.3s ease-in-out',
    willChange: 'opacity',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    '&:active': {
      opacity: '0.4',
    },

    '& > div': {
      alignItems: 'center',
      justifyContent: 'center',
      width: '16px',
      height: '16px',
      transform: 'rotate(90deg)',

      '& > svg > path': {
        stroke: 'rgb(196, 212, 252)',
      },
    },
  });

export default FilterSection;
