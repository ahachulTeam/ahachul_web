import { RankTabSVG, FreeTabSVG, InsightTabSVG } from "../icon";

export const TALK_TABS = {
  rank: {
    icon: <RankTabSVG />,
    label: "인기글",
  },
  free: {
    icon: <FreeTabSVG />,
    label: "자유게시판",
  },
  insight: {
    icon: <InsightTabSVG />,
    label: "정보",
  },
};

export const TALK_TABS_KEYS = {
  rank: "인기글",
  free: "자유게시판",
  insight: "정보",
};
