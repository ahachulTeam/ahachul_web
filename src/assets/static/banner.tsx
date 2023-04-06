import IcMainBanner from "public/illust/onboding/_1.svg";
import IcSubBanner from "public/illust/onboding/_2.svg";

export const ONBOARDING_SLIDER_IMAGES = [
  {
    id: 0,
    bannerImg: <IcMainBanner />,
    title: (
      <>
        한 발 빠른
        <br />
        지하철 소식
      </>
    ),
    subTitle: "알고 싶은 실시간 지하철 정보들을 한 발 빠르게 전해줄게요!",
  },
  {
    id: 1,
    bannerImg: <IcSubBanner />,
    title: (
      <>
        쾌적하고 편안한 여정을
        <br />
        위한 민원 서비스
      </>
    ),
    subTitle: "터치 한 번이면 유저의 의견을 바로 전달할 수 있어요!",
  },
];
