import { vars } from "@ahhachul/themes";
import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const errorBorderColorVariant = createVar();
export const focusBorderColorVariant = createVar();
export const colorVariant = createVar();

export const selectStyle = recipe({
  base: {
    border: "none",
    boxShadow: "none",
    borderRadius: "0",
    // 리셋 스타일
    appearance: "auto",
    color: colorVariant,
    borderStyle: "solid",
    borderWidth: "2px",
    display: "flex",
    alignItems: "center",
    fontWeight: vars.typography.fontWeight[400],
    width: "100%",

    position: "relative",
    zIndex: 2,

    transition: "background-color 0.2s, color 0.2s, border-color 0.2s",

    // @ts-ignore
    "&::placeholder": {
      color: vars.colors.$scale.gray[400],
    },

    "&:focus-visible": {
      outline: "none",
      borderColor: focusBorderColorVariant,

      backgroundColor: "transparent",
    },

    "&[disabled]": {
      opacity: 0.4,
      cursor: "not-allowed",
    },

    "&[data-invalid='true']": {
      outline: "none",
      borderColor: errorBorderColorVariant,
    },
  },
  variants: {
    size: {
      lg: {
        borderRadius: vars.box.radii.md,
        padding: "0 1rem",
        height: "3rem",
        fontSize: vars.typography.fontSize[18],
      },
      md: {
        borderRadius: vars.box.radii.base,
        padding: "0 1rem",
        height: "2.5rem",
        fontSize: vars.typography.fontSize[16],
      },
      sm: {
        borderRadius: vars.box.radii.base,
        padding: "0 0.75rem",
        height: "2rem",
        fontSize: vars.typography.fontSize[14],
      },
      xs: {
        borderRadius: vars.box.radii.sm,
        padding: "0 0.5rem",
        height: "1.5rem",
        fontSize: vars.typography.fontSize[12],
      },
    },
    variant: {
      outline: {
        borderColor: vars.colors.$scale.gray[300],
        backgroundColor: "transparent",
      },
      filled: {
        borderColor: "transparent",
        backgroundColor: vars.colors.$scale.gray[100],
      },
    },
  },
});
