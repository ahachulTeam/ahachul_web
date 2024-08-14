import { f } from '@/src/styles';
import { CSSObject, Theme } from '@emotion/react';

const headerWrap = [
  f.posRel,
  f.flexAlignCenter,
  f.flexJustifySpaceBetween,
  ({
    dimensions: {
      size: {
        height: { header },
      },
    },
    color: { background },
  }: Theme) => ({
    height: header,
    backgroundColor: background[50],
  }),
];

const left = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  fontSize: fontSize[16],
  fontWeight: fontWeight[600],
  paddingLeft: '16px',
});

const right = (hasSearch: boolean): CSSObject => ({
  display: 'grid',
  gridTemplateColumns: hasSearch ? '24px 24px 24px' : '24px 24px',
  alignItems: 'center',
  gap: '16px',
  paddingRight: '16px',

  '& img': {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
  },
});

const titleCss = [
  f.posAbs,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: text[50],
    fontSize: fontSize[16],
    fontWeight: fontWeight[600],
    lineHeight: '18.4px',
  }),
];

export { headerWrap, left, right, titleCss };
