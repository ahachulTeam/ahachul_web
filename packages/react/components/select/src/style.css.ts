import { vars } from '@ahhachul/themes';
import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const errorBorderColorVariant = createVar();
export const focusBorderColorVariant = createVar();
export const colorVariant = createVar();

export const selectStyle = recipe({
  base: {
    border: 'none',
    boxShadow: 'none',
    appearance: 'none',
    borderRadius: '0',
    // 리셋 스타일
    color: colorVariant,
    borderStyle: 'solid',
    borderWidth: '1px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: vars.typography.fontWeight[400],
    width: '100%',

    position: 'relative',
    zIndex: 2,

    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',

    /* Arrow */
    backgroundImage:
      'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23c4d4fc5e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.7rem top 50%',
    backgroundSize: '0.65rem auto',

    // @ts-ignore
    '&::placeholder': {
      color: vars.colors.$scale.blueDarkGray[300],
    },

    '&:focus-visible': {
      outline: 'none',
      borderColor: focusBorderColorVariant,
    },

    '&[disabled]': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },

    "&[data-invalid='true']": {
      outline: 'none',
      borderColor: errorBorderColorVariant,
    },
  },
  variants: {
    size: {
      lg: {
        borderRadius: vars.box.radii.md,
        padding: '0 1rem',
        height: '3rem',
        fontSize: vars.typography.fontSize[16],
      },
      md: {
        borderRadius: vars.box.radii.base,
        padding: '0 0.75rem',
        height: '2.75rem',
        fontSize: vars.typography.fontSize[14],
      },
      sm: {
        borderRadius: vars.box.radii.base,
        padding: '0 0.75rem',
        height: '2.25rem',
        fontSize: vars.typography.fontSize[12],
      },
      xs: {
        borderRadius: vars.box.radii.sm,
        padding: '0 0.5rem',
        height: '1.5rem',
        fontSize: vars.typography.fontSize[11],
      },
    },
    variant: {
      outline: {
        borderColor: vars.colors.$static.foundation.blueGrayAlpha[50],
        backgroundColor: 'transparent',
      },
      filled: {
        borderColor: 'transparent',
        backgroundColor: '#2E3034',
        borderRadius: vars.box.radii.lg,

        '&:focus-visible': {
          outline: 'none',
          borderColor: 'transparent',
        },
      },
    },
  },
});
