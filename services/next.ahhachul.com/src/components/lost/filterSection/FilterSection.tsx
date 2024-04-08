import { CSSObject, Theme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import IconChevron from '@/src/static/icons/system/IconChevron';
import { addSnackBar } from '@/src/stores/ui';
import { f } from '@/src/styles';

// const filterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" stroke="rgb(196, 212, 252)" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
// <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
// </svg>
// `;

const FilterSection = () => {
  let hasConditions = false;

  const dispatch = useDispatch();
  const handleClickFilter = () => {
    dispatch(addSnackBar({ message: '준비중이에요', posBottom: 155 }));
  };

  return (
    <section css={wrap}>
      <ul css={ul(hasConditions)}>
        <li>
          <button css={filterBtn} onClick={handleClickFilter}>
            호선
            <IconChevron />
          </button>
        </li>
      </ul>
    </section>
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

const filterBtn = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  flexShrink: 0,
  border: '1px solid rgb(196, 212, 252, 0.47)',
  height: '30px',
  borderRadius: '124px',
  padding: '0 10px 0 14px',
  width: 'max-content',
  color: 'rgb(196, 212, 252)',
  fontSize: fontSize[12],
  fontWeight: fontWeight[600],
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
