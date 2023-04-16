import Image from "next/image";
import NewsBanner_Subway_Sinsa from "public/carousel/news/subway_sinsa.png";

export const NEWS_SLIDER_IMAGES = [
  {
    id: 0,
    bannerImg: <Image src={NewsBanner_Subway_Sinsa} alt="신사역의 새로운 변화!" />,
    subway: "신사역",
    title: "신사역의 새로운 변화!",
  },
  {
    id: 1,
    bannerImg: <Image src={NewsBanner_Subway_Sinsa} alt="신사역의 새로운 변화!" />,
    subway: "신사역",
    title: "신사역의 새로운 변화!",
  },
];
