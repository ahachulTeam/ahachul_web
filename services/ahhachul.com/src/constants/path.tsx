import {
  마이SVG,
  마이액티브SVG,
  민원SVG,
  민원액티브SVG,
  유실물SVG,
  유실물액티브SVG,
  커뮤니티SVG,
  커뮤니티액티브SVG,
  홈SVG,
  홈액티브SVG,
} from "~/components/shared/gnb/icon";

export const PATH = {
  HOME: "/",
  TALK: "/talk",
  LOSTANDFOUND: "/lostandfound",
  COMPLAINTS: "/complaints",
  ME: "/me",
  WRITE: "/write",
};

export const NAV_MENUS = {
  HOME: {
    label: "홈",
    icon: {
      default: <홈SVG />,
      active: <홈액티브SVG />,
    },
  },
  TALK: {
    label: "커뮤니티",
    icon: {
      default: <커뮤니티SVG />,
      active: <커뮤니티액티브SVG />,
    },
  },
  LOSTANDFOUND: {
    label: "유실물",
    icon: {
      default: <유실물SVG />,
      active: <유실물액티브SVG />,
    },
  },
  COMPLAINTS: {
    label: "민원",
    icon: {
      default: <민원SVG />,
      active: <민원액티브SVG />,
    },
  },
  ME: {
    label: "마이",
    icon: {
      default: <마이SVG />,
      active: <마이액티브SVG />,
    },
  },
};
