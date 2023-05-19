export const colors = {
  white: "#FFFFFF",
  white_10: "#F2F2F2",
  black: "#272727",
  primary: "#00BAF6",
  primary_hover: "#80DDFB",
  primary_active: "#009ED1",
  secondary: "#D0EEFF",
  secondary_hover: "#E2F5FF",
  secondary_active: "#B8E5FF",
  red_10: "#FF8484",
  yellow_10: "#FEE102",
  gray_10: "#F2F2F2",
  gray_15: "#F4F4F4",
  gray_17: "#ECECEC",
  gray_18: "#EEEEEE",
  gray_19: "#E2E2E2",
  gray_20: "#E3E3E3",
  gray_23: "#D9D9D9",
  gray_25: "#DEDEDE",
  gray_30: "#CFCFCF",
  gray_33: "#CACACA",
  gray_35: "#C2C2C2",
  gray_40: "#BCBCBC",
  gray_45: "#B1B1B1",
  gray_50: "#ADADAD",
  gray_55: "#8C8C8C",
  gray_60: "#676767",
  gray_65: "#686868",
  gray_70: "#575757",
  gray_80: "#474747",
  gray_90: "#373737",
  dim: "rgba(0,0,0,0.3)",
  subway: {
    _01: "#2A3E91",
    _02: "#60B157",
    _03: "#FE8A39",
    _04: "#509DD8",
    _05: "#7F41D8",
    _06: "#A95523",
    _07: "#727719",
    _08: "#D2386E",
    _09: "#D1A946",
    airport: "#82B5E0",
    gyeong_joong: "#8CC2A7",
    gyeong_choon: "#4FAC7F",
    suin_bundang: "#E1AB3A",
    sin_bundang: "#BC2A38",
    gyeong_gang: "#3C74EA",
    incheon_01: "#7899CB",
    incheon_02: "#E9AD54",
    everland: "#89C07A",
    uijeongbu: "#F1A145",
    ui_sinseol: "#C5C03E",
    gimpo_gold: "#907227",
    sinrim: "#5367A0",
  },
} as const;

export type ColorType = typeof colors;