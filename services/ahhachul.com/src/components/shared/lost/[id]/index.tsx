import DetailWithImage from './DetailWithImage';
import DetailOnlyText from './DetailOnlyText';
import { useGetLostDetail } from 'queries/lost/useGetLostDetail';

/**
 * {
    "id": 116592,
    "title": "지갑",
    "content": "방화역(5호선)에서는 [24.04.07]  [지갑(블랙(검정)색)]을 습득/보관 하였습니다. 분실하신 분께서는 본인을 증명할 수 있는 서류를 지참하시어 보관중으로 기재되어 있는 기관에 방문하시어 보관물품을 수령하시기 바랍니다. 특이사항 : 없음",
    "writer": null,
    "createdBy": null,
    "date": "2024-04-07 23:00:00",
    "subwayLine": 5,
    "chats": 0,
    "status": "PROGRESS",
    "storage": "방화역(5호선)",
    "storageNumber": "02 -6311-5101",
    "pageUrl": "https://www.lost112.go.kr/find/findDetail.do?ATC_ID=V0000244J04070022&FD_SN=1",
    "images": [],
    "categoryName": "지갑",
    "externalSourceImageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240407/r_20240407113217675.jpg",
    "recommendPosts": [
        {
            "id": 69516,
            "title": "발렌시아가 카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240108/r_20240108031738119.jpg",
            "date": "2024-01-08 06:00:00"
        },
        {
            "id": 114500,
            "title": "카드지갑(신분증)",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240403/r_20240403065149363.jpg",
            "date": "2024-04-03 14:00:00"
        },
        {
            "id": 28439,
            "title": "카카오프렌즈 라이언 카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
            "date": "2023-08-24 17:00:00"
        },
        {
            "id": 51652,
            "title": "루이까또즈 지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20231209/20231209072123228.jpeg",
            "date": "2023-12-09 07:00:00"
        },
        {
            "id": 89176,
            "title": "여성 반지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20240215/r_20240215084151477.jpg",
            "date": "2024-02-15 11:00:00"
        },
        {
            "id": 3109,
            "title": "카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20231124/20231124075443206.jpeg",
            "date": "2023-11-24 07:00:00"
        },
        {
            "id": 97332,
            "title": "여성용지갑(신분증, 카드)",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
            "date": "2024-03-02 22:00:00"
        },
        {
            "id": 59645,
            "title": "카드지갑(연락됨)",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
            "date": "2023-12-22 22:00:00"
        },
        {
            "id": 40528,
            "title": "카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20230706/r_20230706044945516.jpg",
            "date": "2023-07-06 16:00:00"
        },
        {
            "id": 65751,
            "title": "카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
            "date": "2024-01-02 23:00:00"
        },
        {
            "id": 21615,
            "title": "카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/uploadImg/thumbnail/20230919/20230919104939701.jpg",
            "date": "2023-09-19 10:00:00"
        },
        {
            "id": 50444,
            "title": "검정 구찌 카드지갑",
            "writer": "SYSTEM",
            "imageUrl": "https://www.lost112.go.kr/lostnfs/images/sub/img04_no_img.gif",
            "date": "2023-12-01 15:00:00"
        }
    ]
}
 */

type LostDetailMainProps = {
  postId: string;
};

const LostDetailMain = ({ postId }: LostDetailMainProps) => {
  const { data } = useGetLostDetail(postId);

  return <main>{data.hasImage ? <DetailWithImage data={data} /> : <DetailOnlyText data={data} />}</main>;
};

export default LostDetailMain;
