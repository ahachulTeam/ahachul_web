import React from 'react';
import { Box, Flex } from '@ahhachul/react-components-layout';

import LostCard from './Item';
import { useGetLostList } from 'queries/lost/useGetLostList';
import { useAppSelector } from 'stores';
import { ul } from './style';
import { flattenInfinityListData } from 'utils/response';
import VisibilityLoader from 'components/ui/VisibilityLoader';

/**
 * 
 * @returns [
    {
        "id": 116604,
        "title": "카드지갑(신분증상 이름 조**)",
        "content": "창동역(4호선)에서는 [24.04.07]  [카드지갑(신분증상 이름 조**)(브라운(갈)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 4,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "지갑"
    },
    {
        "id": 116602,
        "title": "카드지갑(주민등록증,신용카드, 직업체험이수증",
        "content": "대티역(부산교통공사)에서는 [24.04.07]  [카드지갑(주민등록증,신용카드, 직업체험이수증(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407110944576.jpg",
        "categoryName": "지갑"
    },
    {
        "id": 116601,
        "title": "(50) 남색 후드티",
        "content": "용산역(한국철도공사)에서는 [24.04.07]  [(50) 남색 후드티(로열블루(밝은남)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407111520464.jpg",
        "categoryName": "의류"
    },
    {
        "id": 116600,
        "title": "도복(무술도복)",
        "content": "이태원역(6호선)에서는 [24.04.07]  [도복(무술도복)(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 6,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "의류"
    },
    {
        "id": 116599,
        "title": "프라다 반지갑",
        "content": "전포역(부산교통공사)에서는 [24.04.07]  [프라다 반지갑(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407111559332.jpg",
        "categoryName": "지갑"
    },
    {
        "id": 116598,
        "title": "스마트폰",
        "content": "방화역(5호선)에서는 [24.04.07]  [스마트폰(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 5,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "휴대폰"
    },
    {
        "id": 116597,
        "title": "C타입 충전기",
        "content": "신풍역(7호선)에서는 [24.04.07]  [C타입 충전기(핑크(연한핑크)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 7,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "전자기기"
    },
    {
        "id": 116596,
        "title": "분호색커비주머니(화장품류)",
        "content": "서동탄역(한국철도공사)에서는 [24.04.07]  [분호색커비주머니(화장품류)(핑크(연한핑크)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "기타물품"
    },
    {
        "id": 116595,
        "title": "주인있음",
        "content": "왕십리역(한국철도공사)에서는 [24.04.07]  [주인있음(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "휴대폰"
    },
    {
        "id": 116594,
        "title": "검정가방(바디워시)",
        "content": "금정역(한국철도공사)에서는 [24.04.07]  [검정가방(바디워시)(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "가방"
    },
    {
        "id": 116593,
        "title": "카드지갑",
        "content": "대청역(3호선)에서는 [24.04.07]  [카드지갑(레드(연한레드)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 3,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "지갑"
    },
    {
        "id": 116592,
        "title": "지갑",
        "content": "방화역(5호선)에서는 [24.04.07]  [지갑(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 5,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/r_20240407113217675.jpg",
        "categoryName": "지갑"
    },
    {
        "id": 116591,
        "title": "가방",
        "content": "오금역(3호선)에서는 [24.04.07]  [가방(그레이(회)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 3,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407113300769.jpg",
        "categoryName": "가방"
    },
    {
        "id": 116590,
        "title": "검정색 스포츠백",
        "content": "마천역(5호선)에서는 [24.04.07]  [검정색 스포츠백(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 칫솔세트 외",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 5,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/r_20240407113447853.jpg",
        "categoryName": "가방"
    },
    {
        "id": 116589,
        "title": "카드지갑",
        "content": "오금역(3호선)에서는 [24.04.07]  [카드지갑(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 3,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407113624413.jpg",
        "categoryName": "지갑"
    },
    {
        "id": 116588,
        "title": "손가방",
        "content": "오금역(3호선)에서는 [24.04.07]  [손가방(레드(빨강)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 3,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407113814313.jpg",
        "categoryName": "지갑"
    },
    {
        "id": 116586,
        "title": "인형",
        "content": "신사역(신분당선)에서는 [24.04.07]  [인형(핑크(연한핑크)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 본인 연락완료",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": 18,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/20240407114148057.jpg",
        "categoryName": "기타물품"
    },
    {
        "id": 116585,
        "title": "아이폰 수인분당선내 습득",
        "content": "왕십리역(한국철도공사)에서는 [24.04.07]  [아이폰 수인분당선내 습득(바이올렛(보라)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "휴대폰"
    },
    {
        "id": 116584,
        "title": "스머프인형",
        "content": "광운대역(한국철도공사)에서는 [24.04.07]  [스머프인형(딥스카이블루(새파란하늘)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "기타물품"
    },
    {
        "id": 116583,
        "title": "남성지갑",
        "content": "가야역(부산교통공사)에서는 [24.04.07]  [남성지갑(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
        "writer": null,
        "createdBy": "SYSTEM",
        "date": "2024-04-07 23:00:00",
        "subwayLine": null,
        "chats": 0,
        "status": "PROGRESS",
        "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
        "categoryName": "지갑"
    }
]
 */

function ListSection() {
  const { activeTab } = useAppSelector((state) => state.lost);
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetLostList({
    page: 0,
    size: 20,
    lostType: activeTab,
  });

  const flatData = flattenInfinityListData(data);

  return (
    <>
      <Box as="section">
        <Flex as="ul" direction="column" css={ul}>
          {flatData.map((article) => (
            <LostCard key={article.id} article={article} />
          ))}
        </Flex>
      </Box>
      {hasNextPage && (
        <VisibilityLoader
          callback={() => {
            !isFetchingNextPage && fetchNextPage();
          }}
        />
      )}
    </>
  );
}

export default ListSection;
