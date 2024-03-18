import { vars } from '@ahhachul/themes';
import { style } from '@vanilla-extract/css';
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';

export const BaseStyle = style({
  padding: 0,
  margin: 0,

  // @ts-ignore
  '&:focus-visible': {
    outline: 'none',

    boxShadow: vars.box.shadows.outline,
  },
});

const MarginAndPaddingProperties = defineProperties({
  properties: {
    marginTop: vars.box.spacing,
    marginRight: vars.box.spacing,
    marginBottom: vars.box.spacing,
    marginLeft: vars.box.spacing,
    paddingTop: vars.box.spacing,
    paddingRight: vars.box.spacing,
    paddingBottom: vars.box.spacing,
    paddingLeft: vars.box.spacing,
  },
  shorthands: {
    margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
    padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
});

const BorderStyleProperties = defineProperties({
  properties: {
    borderRadius: vars.box.radii,
  },
});

const BoxShadowStyleProps = defineProperties({
  properties: {
    boxShadow: vars.box.shadows,
  },
});

export const StyleSprinkles = createSprinkles(MarginAndPaddingProperties, BorderStyleProperties, BoxShadowStyleProps);
