import { CSSObject, Theme } from '@emotion/react';
import { f } from '@/src/styles';

const top = [
  f.fullWidth,
  f.flexCenterCenter,
  f.posRel,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
    typography: { fontSize, fontWeight },
  }: Theme): CSSObject => ({
    height: '32px',
    backgroundColor: gray[200],

    '& > span': {
      color: gray[1000],
      fontSize: fontSize[16],
      fontWeight: fontWeight[600],
      lineHeight: '22.54px',
      letterSpacing: '-1%',
    },
  }),
];

const content = [
  f.fullWidth,
  f.flexColumn,
  ({
    color: {
      static: {
        dark: { gray },
      },
    },
  }: Theme): CSSObject => ({
    padding: '20px 20px 0',
    backgroundColor: gray[200],
  }),
];

const buttonGroup: CSSObject = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  justifyItems: 'center',
};

const toggleBtn =
  (isActive: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    justifySelf: 'center',
    border: isActive ? 'none' : '1px solid rgb(196, 212, 252, 0.37)',
    height: '32px',
    borderRadius: '124px',
    padding: '0 14px',
    fontSize: fontSize[14],
    width: 'max-content',
    background: isActive ? 'rgb(196, 212, 252)' : 'inherit',
    color: isActive ? '#141517' : '#9da5b6',
    fontWeight: isActive ? fontWeight[600] : fontWeight[400],
  });

const submitWrap = (hasSubwayLineId: boolean): CSSObject[] => [
  f.fullWidth,
  {
    background: '#141517',
    padding: '40px 0 0',
    ...(hasSubwayLineId && { display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px' }),
  },
];

const submitBtn = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  padding: '0 14px',
  fontSize: fontSize[14],
  width: '100%',
  height: '48px',
  background: 'rgb(196, 212, 252)',
  color: '#141517',
  fontWeight: fontWeight[600],
  borderRadius: '8px',

  '&:disabled': {
    color: '#ffffff',
    opacity: 0.75,
  },
});

export { top, content, buttonGroup, toggleBtn, submitWrap, submitBtn };
