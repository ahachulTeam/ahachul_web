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
    borderRadius: '0',
    appearance: 'none',
    // 리셋 스타일
    color: colorVariant,
    borderStyle: 'solid',
    borderWidth: '2px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: vars.typography.fontWeight[400],
    width: '100%',

    position: 'relative',
    zIndex: 2,

    transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',

    caretColor: 'rgba(0, 255, 163, .5)',

    // @ts-ignore
    '&::placeholder': {
      color: placeholderColorVariant,
    },

    '&:focus-visible': {
      outline: 'none',
      borderColor: focusBorderColorVariant,

      backgroundColor: 'transparent',
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
        fontSize: vars.typography.fontSize[18],
      },
      md: {
        borderRadius: vars.box.radii.base,
        padding: '0 1rem',
        height: '2.5rem',
        fontSize: vars.typography.fontSize[16],
      },
      sm: {
        borderRadius: vars.box.radii.base,
        padding: '0 0.75rem',
        height: '2rem',
        fontSize: vars.typography.fontSize[14],
      },
      xs: {
        borderRadius: vars.box.radii.sm,
        padding: '0 0.5rem',
        height: '1.5rem',
        fontSize: vars.typography.fontSize[12],
      },
    },
    variant: {
      outline: {
        borderColor: vars.colors.$scale.gray[300],
        backgroundColor: 'transparent',
      },
      filled: {
        borderColor: 'transparent',
        backgroundColor: vars.colors.$scale.gray[100],
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
    position: 'relative',
    right: '-2px',
    zIndex: 1,

    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: vars.colors.$scale.gray[300],
    borderRightColor: 'transparent',
    backgroundColor: vars.colors.$scale.gray[100],
  },
  variants: {
    size: {
      lg: {
        borderStartStartRadius: vars.box.radii.md,
        borderEndStartRadius: vars.box.radii.md,
        padding: '0 1rem',
        height: '3rem',
        fontSize: vars.typography.fontSize[18],
      },
      md: {
        borderStartStartRadius: vars.box.radii.base,
        borderEndStartRadius: vars.box.radii.base,
        padding: '0 1rem',
        height: '2.5rem',
        fontSize: vars.typography.fontSize[16],
      },
      sm: {
        borderStartStartRadius: vars.box.radii.base,
        borderEndStartRadius: vars.box.radii.base,
        padding: '0 0.75rem',
        height: '2rem',
        fontSize: vars.typography.fontSize[14],
      },
      xs: {
        borderStartStartRadius: vars.box.radii.sm,
        borderEndStartRadius: vars.box.radii.sm,
        padding: '0 0.5rem',
        height: '1.5rem',
        fontSize: vars.typography.fontSize[12],
      },
    },
  },
});
