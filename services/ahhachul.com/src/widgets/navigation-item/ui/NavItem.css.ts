import { CSSObject, Theme } from '@emotion/react';

const wrap =
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

export { wrap };
