import { CSSObject, Theme } from '@emotion/react';

const wrap: CSSObject = {
  padding: '12px 16px 14px',
  backdropFilter: 'blur(20px)',
  width: 'fit-content',
  borderRadius: '24px',
  position: 'fixed',
  bottom: '12px', // indicator(34px)
  left: 0,
  right: 0,
  margin: '16px auto',
  zIndex: 4000,
  background: 'linear-gradient(91deg, rgba(35, 40, 52, 0.70) 0%, rgba(39, 40, 62, 0.70) 100%)',
  display: 'flex',
  alignItems: 'center',
};

const itemWrap =
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

export { wrap, itemWrap };

// css={css`
// & > svg > path {
//   fill: ${activeTab === href ? 'red' : 'green'};
//   stroke: ${activeTab === href ? 'red' : 'green'};
// }

// & > svg > rect {
//   fill: ${activeTab === href ? 'red' : 'green'};
//   stroke: ${activeTab === href ? 'red' : 'green'};
// }
// `}
