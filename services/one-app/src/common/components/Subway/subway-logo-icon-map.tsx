import {
  SubwayLogo_1호선,
  SubwayLogo_2호선,
  SubwayLogo_3호선,
  SubwayLogo_4호선,
  SubwayLogo_5호선,
  SubwayLogo_6호선,
  SubwayLogo_7호선,
  SubwayLogo_8호선,
  SubwayLogo_9호선,
  SubwayLogo_경강,
  SubwayLogo_경의중앙,
  SubwayLogo_경춘,
  SubwayLogo_공항,
  SubwayLogo_서해,
  SubwayLogo_수인분당,
  SubwayLogo_신분당,
  SubwayLogo_우이신설,
} from '@/common/assets/icons/subway-logo';
import { WithSubwayLineId } from '@/model/Subway';

export const SUBWAY_LOGO_SVG_LIST: Record<
  WithSubwayLineId['subwayLineId'],
  any // TODO
> = {
  '1': <SubwayLogo_1호선 />,
  '2': <SubwayLogo_2호선 />,
  '3': <SubwayLogo_3호선 />,
  '4': <SubwayLogo_4호선 />,
  '5': <SubwayLogo_5호선 />,
  '6': <SubwayLogo_6호선 />,
  '7': <SubwayLogo_7호선 />,
  '8': <SubwayLogo_8호선 />,
  '9': <SubwayLogo_9호선 />,
  '10': <SubwayLogo_경강 />,
  '11': <SubwayLogo_경의중앙 />,
  '12': <SubwayLogo_경춘 />,
  '13': <SubwayLogo_공항 />,
  '15': <SubwayLogo_서해 />,
  '16': <SubwayLogo_수인분당 />,
  '18': <SubwayLogo_신분당 />,
  '20': <SubwayLogo_우이신설 />,
};
