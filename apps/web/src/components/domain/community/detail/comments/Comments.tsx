/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentTime, removeEmptyProperties, useBoolean } from '@ahhachul/lib'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as S from './styled'
import TextDrawer from '@/components/common/drawer/text/TextDrawer'
import useInput from '@/hooks/useInput'
import {
  useCommunityPostComments,
  useCommunityUpdateComment,
  useCommunityDeleteComment,
  useCommentsManagement,
} from '@/queries/community/useCommunityComments'
import { CommentsServerModel } from '@/types/community'
import { UserModel } from '@/types/user'

interface CommentsProps {
  user: UserModel | null
  comments?: Pick<CommentsServerModel, 'comments'>
}

const Comments = ({ user, comments }: CommentsProps) => {
  const { query } = useRouter()

  const { createComment, updateComment, deleteComment } = useCommentsManagement(Number(query?.id))

  const [isModalOpen, _, onModalOpen, onModalClose] = useBoolean(false)

  const [textValue, onChangeTextValue, resetValue, setTextValue] = useInput()

  const [isEditMode, setIsEditMode] = useState<{ isTrue: boolean; commentId: number | null }>({
    isTrue: false,
    commentId: null,
  })

  const handleInputClick = () => {
    resetValue()
    setIsEditMode({ isTrue: false, commentId: null })
    setTimeout(() => {
      onModalOpen()
    }, 250)
  }

  const onSubmitTextValue = () => {
    isEditMode.isTrue
      ? updateComment({
          commentId: isEditMode.commentId as number,
          content: textValue,
        })
      : createComment(
          removeEmptyProperties({
            postId: Number(query?.id),
            content: textValue,
            upperCommentId: isEditMode.commentId ?? undefined,
          })
        )

    onModalClose()
    setIsEditMode({ isTrue: false, commentId: null })
  }

  const handleGenerateChildComment = (commentId: number) => () => {
    resetValue()
    setIsEditMode({ isTrue: false, commentId })
    setTimeout(() => {
      onModalOpen()
    }, 250)
  }

  const handleEditParentComment = (commentId: number, idx: number) => () => {
    setIsEditMode({ isTrue: true, commentId })
    setTextValue(comments?.comments?.[idx]?.parentComment?.content as string)
    setTimeout(() => {
      onModalOpen()
    }, 250)
  }

  const handleEditChildComment = (parentIdx: number, childIdx: number, commentId: number) => () => {
    setIsEditMode({ isTrue: true, commentId })
    setTextValue(comments?.comments?.[parentIdx]?.childComments?.[childIdx]?.content as string)
    setTimeout(() => {
      onModalOpen()
    }, 250)
  }

  const handleDeleteComment = (commentId: number) => () => {
    deleteComment({
      commentId: Number(commentId),
    })
  }

  return (
    <>
      <S.GenerateCommentSection>
        <S.Comments>
          <S.Title>
            댓글 <b>{comments?.comments?.length || 0}개</b>
          </S.Title>
          <S.InputCoverBtn onClick={handleInputClick}>
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
        {comments?.comments?.map(({ parentComment, childComments }, parentIdx) => {
          if (parentComment?.status === 'DELETED') {
            return (
              <div key={parentComment?.id} css={S.commentBoxCss} data-status="delete">
                <div css={S.commentTopInfoCss}>
                  <b>{parentComment.writer}</b>
                  <p>{getCurrentTime(parentComment.createdAt)}</p>
                </div>
                <pre>삭제된 댓글입니다.</pre>
              </div>
            )
          }

          return (
            <>
              <div key={parentComment?.id} css={S.commentBoxCss}>
                <div css={S.commentTopInfoCss}>
                  <b>{parentComment.writer}</b>
                  <p>{getCurrentTime(parentComment.createdAt)}</p>
                </div>
                <pre>{parentComment.content}</pre>
                <div css={S.commentBottomButtonGroupCss}>
                  {parentComment?.createdBy !== user?.memberId && <button>신고</button>}
                  <button onClick={handleGenerateChildComment(Number(parentComment.id))}>답글 쓰기</button>
                  {parentComment?.createdBy === user?.memberId && (
                    <>
                      <button onClick={handleEditParentComment(Number(parentComment.id), parentIdx)}>수정</button>
                      <button onClick={handleDeleteComment(Number(parentComment.id))}>삭제</button>
                    </>
                  )}
                </div>
              </div>
              {childComments &&
                childComments.map((childComment, childIdx) => {
                  if (childComment?.status === 'DELETED') {
                    return (
                      <div key={childComment?.id} css={S.commentBoxCss} data-status="delete" data-type="child-comment">
                        <div css={S.commentTopInfoCss}>
                          <b data-type="child-comment">{childComment.writer}</b>
                          <p>{getCurrentTime(childComment.createdAt)}</p>
                        </div>
                        <pre>삭제된 댓글입니다.</pre>
                      </div>
                    )
                  }

                  return (
                    <div key={childComment?.id} css={S.commentBoxCss} data-type="child-comment">
                      <div css={S.commentTopInfoCss}>
                        <b data-type="child-comment">{childComment.writer}</b>
                        <p>{getCurrentTime(childComment.createdAt)}</p>
                      </div>
                      <pre>{childComment.content}</pre>
                      <div css={S.commentBottomButtonGroupCss}>
                        {childComment?.createdBy !== user?.memberId && <button>신고</button>}
                        {childComment?.createdBy === user?.memberId && (
                          <>
                            <button onClick={handleEditChildComment(parentIdx, childIdx, Number(childComment.id))}>
                              수정
                            </button>
                            <button onClick={handleDeleteComment(Number(childComment.id))}>삭제</button>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
            </>
          )
        })}
      </S.CommentListSection>
    </>
  )
}

export default Comments
