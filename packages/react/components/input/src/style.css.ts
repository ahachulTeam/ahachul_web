import { vars } from '@ahhachul/themes';
import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const errorBorderColorVariant = createVar();
export const focusBorderColorVariant = createVar();
export const colorVariant = createVar();
export const placeholderColorVariant = createVar();

export const inputStyle = recipe({
  base: {
    border: 'none',
    boxShadow: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    borderRadius: 0,
    // 위에까지는  리셋 스타일

    color: colorVariant,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: vars.colors.$static.foundation.blueGrayAlpha[50],

    display: 'flex',
    alignItems: 'center',
    width: '100%',

    position: 'relative',
    zIndex: 2,

    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
    caretColor: vars.colors.$static.foundation.greenAlpha[200],

    // @ts-ignore
    '&::placeholder': {
      color: placeholderColorVariant,
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
        borderRadius: vars.box.radii.md,
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

export const inputGroupStyle = style({
  margin: 0,
  padding: 0,
  border: 0,

  display: 'flex',
  position: 'relative',
});

export const inputAddonStyle = recipe({
  base: {
    margin: 0,
    border: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 1,
    aspectRatio: '1 / 1',
    backgroundColor: '#2E3034',
  },
  variants: {
    size: {
      lg: {
        height: '3rem',
        fontSize: vars.typography.fontSize[16],
        borderEndStartRadius: vars.box.radii.md,
        borderStartStartRadius: vars.box.radii.md,
      },
      md: {
        height: '2.75rem',
        fontSize: vars.typography.fontSize[14],
        borderEndStartRadius: vars.box.radii.md,
        borderStartStartRadius: vars.box.radii.md,
      },
      sm: {
        height: '2.25rem',
        fontSize: vars.typography.fontSize[12],
        borderEndStartRadius: vars.box.radii.md,
        borderStartStartRadius: vars.box.radii.md,
      },
      xs: {
        height: '1.5rem',
        fontSize: vars.typography.fontSize[11],
        borderEndStartRadius: vars.box.radii.sm,
        borderStartStartRadius: vars.box.radii.sm,
      },
    },
  },
});
