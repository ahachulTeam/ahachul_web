import { CSSObject, Theme } from '@emotion/react';

export const navbar =
  (visible: boolean) =>
  ({
    dimensions: {
      zIndexes: { nav },
    },
  }: Theme): CSSObject => ({
    position: 'fixed',
    bottom: '12px',
    left: 0,
    right: 0,

    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    margin: '16px auto',
    padding: '12px 16px 14px',
    borderRadius: '24px',
    backdropFilter: 'blur(20px)',
    background: 'linear-gradient(91deg, rgba(35, 40, 52, 0.70) 0%, rgba(39, 40, 62, 0.70) 100%)',

    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(8%)',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-out',
    zIndex: nav,
  });
