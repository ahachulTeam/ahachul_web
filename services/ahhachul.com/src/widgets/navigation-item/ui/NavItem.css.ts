import { CSSObject, Interpolation, keyframes, Theme } from '@emotion/react';

export const wrap =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'rgb(65, 66, 89)',
    boxShadow: 'none',
    position: 'relative',
    zIndex: 10,

    '& > button': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2px',
      width: '48px',
      textDecoration: 'none',
      fontSize: fontSize[11],
      fontWeight: fontWeight[500],
      color: isActive ? 'rgb(196, 212, 252)' : 'inherit',
      transition: 'color 0.4s',

      '& > div > svg': {
        width: '20px',
        height: '20px',

        '& > path, & > rect': {
          fill: isActive ? 'rgb(196, 212, 252)' : 'rgb(65, 66, 89)',
        },
      },

      '&:focus': {
        color: 'rgb(196, 212, 252)',
        boxShadow: 'none',
      },
      '& span': {
        marginTop: '4px',
      },
      '& div': {
        margin: '1px auto',
      },
    },
  });

const fadeIn = (translateY: number) => keyframes`
  0% { opacity: 0; transform: translate(-50%, 0); z-index: -1; }
  75% { opacity: 0.2; transform: translate(-50%, 0); }
  100% { opacity: 1; transform: translate(-50%, -${translateY}px); z-index: 1; }
`;

export const plusBtn = {
  animation: `0.5s forwards ${fadeIn(60)}`,
  position: 'absolute',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  background:
    'linear-gradient(91deg, rgba(35, 40, 52, 0.90) 0%, rgba(39, 40, 62, 0.90) 100%)',
  width: '36px',
  height: '36px',
  padding: '8px',
  borderRadius: 9999,
  zIndex: -1,
  willChange: 'opacity, transform',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.04)',

  '& > div > svg': {
    width: '20px !important',
    height: '20px !important',

    '& > path, & > rect': {
      fill: 'rgb(65, 66, 89) !important',
      stroke: 'rgb(196, 212, 252) !important',
    },
  },
} as Interpolation<Theme>;
