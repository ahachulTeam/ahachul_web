import { CommunityDetailModel } from "@/types/community";
import * as S from "./styled";

interface CommentsProps {
  data: CommunityDetailModel;
}

function Comments({ data }: CommentsProps) {
  console.log(data);
  return <S.Comments />;
}

export default Comments;
