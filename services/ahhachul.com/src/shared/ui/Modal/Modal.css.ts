import { Interpolation, Theme } from '@emotion/react';
import cssUtils from 'shared/utils.css';

export const modalOverlayCss = [
  cssUtils.posAbsFull,
  cssUtils.flexCenterCenter,
  ({ dimensions: { zIndexes } }: Theme) => ({
    zIndex: zIndexes.modal,
    background: 'rgba(0, 0, 0, 0.60)',
    padding: '28px',
  }),
] as Interpolation<Theme>;
