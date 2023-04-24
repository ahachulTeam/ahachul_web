import Image from "next/image";
import { v4 } from "uuid";

export const ONBOARDING_CAROUSELS = [
  {
    id: v4(),
    title: (
      <>
        한 발 빠른
        <br />
        지하철 소식
      </>
    ),
    overview: "실시간 지하철 정보들을 한 발 빠르게 전해줄게요!",
    backdropPath: "illust/onbording/_01.svg",
  },
  {
    id: v4(),
    title: (
      <>
        쾌적하고 편안한 여정을
        <br />
        위한 민원 서비스
      </>
    ),
    overview: "터치 한 번이면 의견을 바로 전달할 수 있어요!",
    backdropPath: "illust/onbording/_02.svg",
  },
  {
    id: v4(),
    title: (
      <>
        출.퇴근 더이상
        <br />
        복잡한 지하철 그만!
      </>
    ),
    overview: "열차내 다양한 가나다라마바나다라마바",
    backdropPath: "illust/onbording/_03.svg",
  },
  {
    id: v4(),
    title: (
      <>
        한 번에 찾아주는
        <br />
        아하철 분실물 보관함
      </>
    ),
    overview: "열차내 다양한 가나다라마바나다라마바",
    backdropPath: "illust/onbording/_04.svg",
  },
];

export const NEWS_SLIDER_IMAGES = [
  {
    id: 0,
    bannerImg: (
      <Image
        src="/carousel/news/subway_sinsa.jpg"
        alt="신사역의 새로운 변화!"
        width={430}
        height={189}
        priority
      />
    ),
    subway: "신사역",
    title: "신사역의 새로운 변화!",
  },
  {
    id: 1,
    bannerImg: (
      <Image
        src="/carousel/news/subway_sinsa.jpg"
        alt="신사역의 새로운 변화!"
        width={430}
        height={189}
        priority
      />
    ),
    subway: "강남역",
    title: "강남역의 새로운 변화!",
  },
] as const;
