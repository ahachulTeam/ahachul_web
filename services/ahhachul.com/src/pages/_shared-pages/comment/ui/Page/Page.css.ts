import { Interpolation, Theme, css } from '@emotion/react';
import cssUtils from 'shared/utils.css';

4;
export const commentListWrap = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  {
    borderTop: '1px solid rgb(196, 212, 252, 0.37)',

    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid hsla(0, 0%, 100%, .06)',
    },
  },
] as Interpolation<Theme>;

export const emptyComment = [
  cssUtils.fullWidth,
  cssUtils.flexColumn,
  cssUtils.flexCenterCenter,
  ({ color: { text }, typography: { fontSize } }: Theme) => ({
    color: text[50],
    fontSize: fontSize[14],
    minHeight: '240px',
    borderTop: '1px solid rgb(196, 212, 252, 0.37)',
  }),
] as Interpolation<Theme>;

export const contentBody = [
  cssUtils.fullWidth,
  ({ color: { text }, typography: { fontSize, fontWeight } }: Theme) => ({
    color: text[50],
    fontSize: fontSize[14],
    fontWeight: fontWeight[400],
    padding: '24px 20px 32px 20px',
  }),
] as Interpolation<Theme>;

export const articleCardContentParser = css`
  padding: 0;
  margin-top: 12px;

  & > div {
    border: none;
  }

  .editor-input {
    min-height: unset !important;
    max-height: 46px !important;

    p {
      margin-bottom: 4px !important;
    }
  }
`;
