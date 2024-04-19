import { CSSObject, Theme } from '@emotion/react';
import { f } from 'styles';

const userName = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  color: '#c9cedc',
  fontSize: fontSize[16],
  fontWeight: fontWeight[700],
  textAlign: 'left',
  marginBottom: '2px',
});

const time = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#9da5b6',
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
});

const tag = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#c9cedc',
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
});

const category = ({ typography: { fontSize, fontWeight } }: Theme): CSSObject => ({
  position: 'absolute',
  top: '50%',
  right: '20px',
  transform: 'translateY(-50%)',
  color: '#c9cedc',
  fontSize: fontSize[12],
  fontWeight: fontWeight[500],
  borderRadius: '24px',
  border: '1px solid hsla(0, 0%, 100%, .09)',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const btn =
  (b: boolean) =>
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    color: '#9da5b6',
    fontSize: fontSize[12],
    fontWeight: fontWeight[b ? 700 : 500],
  });

const commentTitle = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#c9cedc',
  fontSize: fontSize[14],
  fontWeight: fontWeight[700],
});

const commentNickname = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#c9cedc',
  fontSize: fontSize[12],
  fontWeight: fontWeight[700],
});

const commentContent = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#c9cedc',
  fontSize: fontSize[14],
  fontWeight: fontWeight[400],
  paddingRight: '42px',
  margin: '6px 0',
});

const reCommentBtn = ({ typography: { fontSize, fontWeight } }: Theme) => ({
  color: '#697183',
  fontSize: fontSize[12],
  fontWeight: fontWeight[600],
});

const commentLoveBtn = [
  f.flexAlignCenter,
  ({ typography: { fontSize, fontWeight } }: Theme) => ({
    '& > div': {
      '& > svg > path': {
        fill: '#c9cedc',
      },
    },

    '& > span': {
      color: '#697183',
      fontSize: fontSize[12],
      fontWeight: fontWeight[400],
      marginLeft: '4px',
    },
  }),
];

const commentList = [
  f.flexColumn,
  {
    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
    },

    paddingBottom: '24px',
  },
];

export {
  userName,
  time,
  tag,
  category,
  btn,
  commentTitle,
  commentNickname,
  commentContent,
  reCommentBtn,
  commentLoveBtn,
  commentList,
};
