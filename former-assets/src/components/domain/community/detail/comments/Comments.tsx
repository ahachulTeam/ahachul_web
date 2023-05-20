import * as S from "./styled";

const DUMMY_COMMENTS = {
  comments: [
    {
      id: 1,
      content: "내용",
      createdAt: "2023-05-16T13:59:30.210355878",
      createdBy: "작성자 ID",
      writer: "작성자 닉네임",
    },
    {
      id: 2,
      upperCommentId: 1,
      content: "내용",
      createdAt: "2023-05-16T13:59:30.210355878",
      createdBy: "작성자 ID",
      writer: "작성자 닉네임",
    },
  ],
};

function Comments() {
  return (
    <S.Comments>
      <S.Title>
        댓글 <b>2개</b>
      </S.Title>
      <S.CommentInput placeholder="댓글을 입력해주세요." />
    </S.Comments>
  );
}

export default Comments;
