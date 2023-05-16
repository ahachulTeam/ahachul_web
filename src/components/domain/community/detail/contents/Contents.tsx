import { CommunityDetailModel } from "@/types/community";
import * as S from "./styled";

interface ContentsProps {
  data: CommunityDetailModel;
}

function Contents({ data }: ContentsProps) {
  return (
    <S.Contents>
      <S.Title>{data.title}</S.Title>
      <div>
        <span>{data.time}</span>
        <span>{data.author}</span>
      </div>
      <div>
        <span>{data.viewCnt}</span>
        <span>{data.commentCnt}</span>
        <span>{data.likeCnt}</span>
      </div>
      <div>{/* <Image src={data.img_url} alt="" priority fill /> */}</div>
      <pre>{data.content}</pre>
      <ul>
        {data.hashtags.map((tag, i) => {
          // eslint-disable-next-line react/no-array-index-key
          return <li key={i}>{tag}</li>;
        })}
      </ul>
      <div>
        <button type="button">좋아요</button>
        <button type="button">싫어요</button>
      </div>
    </S.Contents>
  );
}

export default Contents;
