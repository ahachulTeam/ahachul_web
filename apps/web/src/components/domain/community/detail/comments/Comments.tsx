/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentTime, useBoolean } from '@ahhachul/lib'
import { useRouter } from 'next/router'
import * as S from './styled'
import TextDrawer from '@/components/common/drawer/text/TextDrawer'
import useInput from '@/hooks/useInput'
import { useCommunityPostComments } from '@/queries/community/useCommunityComments'
import { CommentsServerModel } from '@/types/community'

interface CommentsProps {
  comments?: Pick<CommentsServerModel, 'comments'>
}

const Comments = ({ comments }: CommentsProps) => {
  const { query } = useRouter()

  const { mutate: createComment } = useCommunityPostComments()

  const [isModalOpen, _, onModalOpen, onModalClose] = useBoolean(false)

  const [textValue, onChangeTextValue] = useInput()

  const onSubmitTextValue = () => {
    const req = {
      postId: Number(query?.id),
      content: textValue,
    }
    createComment(req)

    onModalClose()
  }

  return (
    <>
      <S.GenerateCommentSection>
        <S.Comments>
          <S.Title>
            댓글 <b>{comments?.comments?.length || 0}개</b>
          </S.Title>
          <S.InputCoverBtn onClick={onModalOpen}>
            <S.CommentInput placeholder="댓글을 입력해주세요." disabled />
          </S.InputCoverBtn>
        </S.Comments>
        <TextDrawer
          isOpen={isModalOpen}
          textValue={textValue}
          onChangeTextValue={onChangeTextValue}
          onSubmitTextValue={onSubmitTextValue}
          onClose={onModalClose}
        />
      </S.GenerateCommentSection>

      <S.CommentListSection>
        {comments?.comments?.map(({ parentComment }) => {
          return (
            <div key={parentComment?.id} css={S.commentBoxCss}>
              <div css={S.commentTopInfoCss}>
                <b>{parentComment.writer}</b>
                <p>{getCurrentTime(parentComment.createdAt)}</p>
              </div>
              <pre>{parentComment.content}</pre>
              <div css={S.commentBottomButtonGroupCss}>
                <button>신고</button>
                <button>답글 쓰기</button>
              </div>
            </div>
          )
        })}
      </S.CommentListSection>
    </>
  )
}

export default Comments
