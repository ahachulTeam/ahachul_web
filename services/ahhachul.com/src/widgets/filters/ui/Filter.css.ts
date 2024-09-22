import { css, type Interpolation, type Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const motion = (scale: boolean) =>
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

export const filterGroup = (scale: boolean) =>
  css({
    position: 'fixed',
    top: '58px',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: scale ? '9px' : '16px',
    zIndex: 99,
    transform: scale ? 'translateY(-42px)' : 'translateY(0)',
    transition: 'all 0.4s ease',
    borderBottom: '1px solid #c9c9c92f',
    backgroundColor: '#141517',
    paddingBottom: '16px',
  });

export const btn_wrap = [
  cssUtils.fullWidth,
  cssUtils.flexAlignCenter,
  cssUtils.overflowXScroll,
  {
    paddingLeft: '20px',
    paddingRight: '20px',
    gap: '8px',
  },
] as Interpolation<Theme>;

export const buttonFilter = ({
  color: { whiteAlpha },
  typography: { fontWeight, lineHeight },
}: Theme) =>
  ({
    flexShrink: 0,
    height: '30px',
    backgroundColor: whiteAlpha[50],
    border: `1px solid ${whiteAlpha[100]}`,
    borderRadius: '18px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    transition: 'background-color 0.2s ease-out',

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
      transform: 'rotate(0deg)',

      '& > path': {
        strokeWidth: '1px',
      },
    },

    '& > .arrow-down-img.rotate': {
      transform: 'rotate(180deg)',
    },

    '&[data-active="true"]': {
      backgroundColor: '#267CDD',
    },
  }) as Interpolation<Theme>;

export const dropdownMenu = css`
  .DropdownMenuContent,
  .DropdownMenuSubContent {
    min-width: 225px;
    background-color: #2a2b2c;
    border-radius: 10px;
    box-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    animation-duration: 700ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .DropdownMenuContent[data-side='bottom'] {
    animation-name: slideUpAndFade;
  }

  .DropdownMenuSubContent[data-side='right'] {
    animation-name: slideRightAndFade;
  }

  .DropdownMenuItem {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    padding-left: 12px;
    user-select: none;
    outline: none;

    &:not(:last-of-type) {
      border-bottom: 1px solid #535456;
    }
  }

  .DropdownMenuItem.red {
    color: #f94539;
  }

  .DropdownMenuRadioItem {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    padding-left: 32px;
    user-select: none;
    outline: none;

    &:not(:last-of-type) {
      border-bottom: 1px solid #535456;
    }
  }

  .DropdownMenuSubTrigger {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    position: relative;
    padding-left: 32px;
    padding-right: 12px;
    user-select: none;
    outline: none;
  }

  .DropdownMenuSubTrigger[data-state='open'],
  .DropdownMenuSubTrigger[data-highlighted] {
    background-color: #c7d2fe;
    color: #4f46e5;
  }

  .DropdownMenuItemIndicator {
    position: absolute;
    left: 6px;
    width: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .DropdownMenuLabel {
    padding: 2px 12px;
    font-size: 12px;
    line-height: 25px;
    color: #c7d2fe;
    border-bottom: 1px solid #535456;
  }

  .DropdownMenuSeparator {
    height: 1px;
    background-color: #535456;
  }

  .DropdownMenuArrow {
    fill: white;
  }

  .DropdownMenuItemIndicator svg {
    width: 22px;
    height: 22px;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
