import { recipe } from '@vanilla-extract/recipes';
import { createVar, keyframes } from '@vanilla-extract/css';
import { classes, vars } from '@ahhachul/themes';

export const radiusVariant = createVar();
export const colorVariant = createVar();
export const enableColorVariant = createVar();
export const hoverColorVariant = createVar();
export const activeColorVariant = createVar();

export const buttonStyle = recipe({
  base: {
    margin: 0,
    padding: 0,
    border: 0,
    background: 'none',

    color: colorVariant,
    borderRadius: radiusVariant,

    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
    // @ts-ignore
    '&[disabled]': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    '&[data-loading="true"]': {
      '& span': {
        opacity: 0,
      },
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: vars.box.shadows.outline,
    },
    '&:hover:not([disabled])': {
      backgroundColor: hoverColorVariant,
    },
    '&:active:not([disabled])': {
      backgroundColor: activeColorVariant,
    },
  },
  variants: {
    size: {
      xs: {
        ...classes.typography.text.xs,
        fontWeight: vars.typography.fontWeight[500],
        padding: '0 0.625rem',
        gap: '0.25rem',
        height: '1.875rem',
      },
      sm: {
        ...classes.typography.text.sm,
        fontWeight: vars.typography.fontWeight[500],
        padding: '0 0.75rem',
        gap: '0.375rem ',
        height: '2.25rem',
      },
      md: {
        ...classes.typography.text.md,
        fontWeight: vars.typography.fontWeight[600],
        padding: '0 1rem',
        gap: '0.5rem',
        height: '2.5rem',
      },
      lg: {
        ...classes.typography.text.lg,
        fontWeight: vars.typography.fontWeight[600],
        padding: '0 1.5rem',
        gap: '0.5rem',
        height: '3rem',
      },
    },
    variant: {
      solid: {
        backgroundColor: enableColorVariant,
      },
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${enableColorVariant}`,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export const spanStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    size: {
      xs: {
        ...classes.typography.text.xs,
        fontWeight: vars.typography.fontWeight[600],
      },
      sm: {
        ...classes.typography.text.sm,
        fontWeight: vars.typography.fontWeight[600],
      },
      md: {
        ...classes.typography.text.md,
        fontWeight: vars.typography.fontWeight[600],
      },
      lg: {
        ...classes.typography.text.lg,
        fontWeight: vars.typography.fontWeight[600],
      },
    },
  },
});

const spinKeyframes = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const spinnerStyle = recipe({
  base: {
    position: 'absolute',
    animation: `${spinKeyframes} 0.45s linear infinite`,
    display: 'inline-block',
    borderTop: '1px solid currentcolor',
    borderRight: '1px solid currentcolor',
    borderBottom: '1px solid transparent',
    borderLeft: '1px solid transparent',
    borderRadius: '50%',
  },
  variants: {
    size: {
      xs: {
        width: vars.typography.fontSize[11],
        height: vars.typography.fontSize[11],
        left: `calc(50% - ${vars.typography.fontSize[11]}/2)`,
      },
      sm: {
        width: vars.typography.fontSize[11],
        height: vars.typography.fontSize[11],
        left: `calc(50% - ${vars.typography.fontSize[11]}/2)`,
      },
      md: {
        width: vars.typography.fontSize[12],
        height: vars.typography.fontSize[12],
        left: `calc(50% - ${vars.typography.fontSize[12]}/2)`,
      },
      lg: {
        width: vars.typography.fontSize[14],
        height: vars.typography.fontSize[14],
        left: `calc(50% - ${vars.typography.fontSize[14]}/2)`,
      },
    },
  },
});
