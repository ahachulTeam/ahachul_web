import { css, type Interpolation, type Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const wrap = (asChild: boolean) => ({
  padding: '12px 20px',

  '& > article': {
    paddingLeft: asChild ? '16px' : '0',
  },
});

export const name = ({
  color: { text },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    fontSize: fontSize[12],
    fontWeight: fontWeight[700],
    color: text[50],
  }) as Interpolation<Theme>;

export const body = ({
  color: { text },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    color: text[50],
    fontSize: fontSize[14],
    fontWeight: fontWeight[400],
    paddingRight: '42px',
    margin: '6px 0 12px',
  }) as Interpolation<Theme>;

export const 답글달기 = ({
  color: { blueDarkGray },
  typography: { fontSize, fontWeight },
}: Theme) =>
  ({
    fontSize: fontSize[12],
    fontWeight: fontWeight[600],
    color: blueDarkGray[50],
  }) as Interpolation<Theme>;

export const like = [
  cssUtils.flexAlignCenter,
  ({
    color: { blueDarkGray },
    typography: { fontSize, fontWeight },
  }: Theme) => ({
    '& > div': {
      '& > svg > path': {
        fill: blueDarkGray[600],
      },
    },

    '& > span': {
      marginLeft: '4px',
      fontSize: fontSize[12],
      fontWeight: fontWeight[400],
      color: blueDarkGray[50],
    },
  }),
] as Interpolation<Theme>;

export const dropdownMenu = css`
  .DropdownMenuContent,
  .DropdownMenuSubContent {
    min-width: 125px;
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

  .DropdownMenuRadioItem {
    font-size: 16px;
    line-height: 1;
    color: #f6f6f6;
    display: flex;
    align-items: center;
    height: 45px;
    position: relative;
    padding-left: 16px;
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
