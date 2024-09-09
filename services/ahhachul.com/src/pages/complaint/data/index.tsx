import { 환경Icon } from '../static/icons/환경Icon';
import { 질서Icon } from '../static/icons/질서Icon';
import { 화살표Icon } from '../static/icons/화살표Icon';
import { 폭력Icon } from '../static/icons/폭력Icon';
import { 응급Icon } from '../static/icons/응급Icon';

export const complaintsContentList = {
  환경민원: {
    label: '환경민원',
    desc: '토사물, 오물, 환기',
    icon: <환경Icon />,
  },
  온도조절: { label: '온도조절', desc: '덥거나 추울 때', icon: null },
  질서저해: {
    label: '질서저해',
    desc: '취객, 노숙, 구걸 등',
    icon: <질서Icon />,
  },
  안내방송: {
    label: '안내방송',
    desc: '방송불량, 음량 조절까지 한 번에',
    icon: <화살표Icon />,
  },
  응급환자: {
    label: '응급환자',
    desc: '환자 긴급 신고',
    icon: <응급Icon />,
  },
  폭력: {
    label: '폭력',
    desc: '열차 내 폭행신고',
    icon: <폭력Icon />,
  },
  성추행: {
    label: '성추행',
    desc: '열차 내 성폭력, 몰래카메라',
    icon: <화살표Icon />,
  },
};
