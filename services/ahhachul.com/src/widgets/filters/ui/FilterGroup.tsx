import { useReducer } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import { Portal } from 'shared/ui/Portal';
import cssUtils from 'shared/utils.css';
import { ButtonFilter } from './ButtonFilter';
import { SearchFilter } from './SearchFilter';

interface FilterGroupProps {
  show: boolean;
}
export const FilterGroup = ({ show }: FilterGroupProps) => {
  const [scale, toggleScale] = useReducer((scale) => !scale, false);
  const handleInputFocus = () => {
    toggleScale();
  };

  console.log('show:', show);

  return (
    <Portal>
      <div css={motion(scale)} />
      <div css={filterGroup(scale)}>
        <SearchFilter handleFocus={handleInputFocus} />
        <div css={btn_wrap}>
          <ButtonFilter type="dropdown-filter" label="인기" />
          <ButtonFilter type="drawer-filter" label="작성자" />
        </div>
      </div>
    </Portal>
  );
};

const motion = (scale: boolean) =>
  css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: scale ? '58px' : 0,
    zIndex: scale ? 89 : 0,
    backgroundColor: scale ? '#141517' : 'rgba(0,0,0,0)',
    transition: 'background-color 0.15s ease',
  });

const filterGroup = (scale: boolean) =>
  css({
    position: 'fixed',
    top: '58px',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '16px',
    zIndex: 99,
    transform: scale ? 'translateY(-42px)' : 'translateY(0)',
    transition: 'all 0.4s ease',
    borderBottom: '1px solid #c9c9c92f',
    backgroundColor: '#141517',
    paddingBottom: '16px',
  });

const btn_wrap = [
  cssUtils.fullWidth,
  cssUtils.flexAlignCenter,
  cssUtils.overflowXScroll,
  cssUtils.sideGutter,
  cssUtils.flexAlignCenter,
  {
    gap: '8px',
  },
] as Interpolation<Theme>;
