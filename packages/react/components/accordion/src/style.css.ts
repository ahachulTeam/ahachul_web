import { vars } from "@ahhachul/themes";
import { createVar, style } from "@vanilla-extract/css";

const resetStyle = style({
  margin: 0,
  padding: 0,
  border: 0,
  background: "none",
});

export const accordionStyle = style([resetStyle]);

export const accordionItemStyle = style([
  resetStyle,
  {
    width: "100%",
    borderTop: `1px solid ${vars.colors.$scale.gray[300]}`,

    // @ts-ignore
    "&:last-of-type": {
      borderBottom: `1px solid ${vars.colors.$scale.gray[300]}`,
    },
  },
]);

export const accordionButtonStyle = style([
  resetStyle,
  {
    width: "100%",
    padding: "0.5rem 0.75rem",
    gap: "0.625rem",
    display: "flex",
    alignItems: "center",
  },
]);

export const panelHeight = createVar();
export const accordionPanelStyle = style([
  resetStyle,
  {
    width: "100%",
    height: panelHeight,
    overflow: "hidden",
    transition: "height 0.3s ease",

    // @ts-ignore
    "& > div[data-name='panel-inner']": {
      padding: "0.5rem 0.75rem 1.25rem",
    },
  },
]);
