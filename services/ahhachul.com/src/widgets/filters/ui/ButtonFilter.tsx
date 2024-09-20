import { PropsWithChildren } from 'react';
import { css, type Interpolation, type Theme } from '@emotion/react';
import arrowDown from 'shared/static/images/arrow_down.png';

type ButtonFilterType = 'dropdown-filter' | 'drawer-filter';
interface ButtonFilterProps {
  label: string;
  type: ButtonFilterType;
}

export const ButtonFilter = ({
  label,
  type,
  children,
}: PropsWithChildren<ButtonFilterProps>) => {
  let open = false;
  const handleClick = () => {
    console.log(type);
  };

  return (
    <div css={filterWrapper}>
      <button css={buttonFilter} onClick={handleClick}>
        <span>{label}</span>
        <img
          className={'arrow-down-img' + (open ? ' rotate' : '')}
          src={arrowDown}
        />
      </button>
      <div css={childWrapper}>{children}</div>
    </div>
  );
};

const filterWrapper = css({
  position: 'relative',
});

export const buttonFilter = ({
  color: { whiteAlpha },
  typography: { fontWeight, lineHeight },
}: Theme) =>
  ({
    flexShrink: 0,
    height: '26px',
    backgroundColor: whiteAlpha[50],
    border: `1px solid ${whiteAlpha[100]}`,
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',

    '& > span': {
      color: '#ffffff',
      fontSize: '13px',
      fontWeight: fontWeight[500],
      lineHeight: lineHeight[133],
      letterSpacing: '-0.4px',
      marginLeft: '6px',
    },

    '& > .arrow-down-img': {
      width: '19px',
      marginLeft: '4px',
      transform: 'rotate(0deg)px',
    },

    '& > .arrow-down-img.rotate': {
      transform: 'rotate(180deg)',
    },
  }) as Interpolation<Theme>;

const childWrapper = css({
  position: 'absolute',
});
