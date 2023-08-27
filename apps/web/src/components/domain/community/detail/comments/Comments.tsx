/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentTime, removeEmptyProperties, useBoolean } from '@ahhachul/lib'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useState, useMemo } from 'react'
import * as S from './styled'
import { Dialog } from '@/components/common/dialog'
import TextDrawer from '@/components/common/drawer/text/TextDrawer'
import { useToast } from '@/hooks'
import useInput from '@/hooks/useInput'
import { useCommentsManagement } from '@/queries/community/useCommunityComments'
import { useCommunityCommentsQuery } from '@/queries/community/useCommunityComments'
import { UserModel } from '@/types/user'

interface CommentsProps {
  user: UserModel | null
}

const Comments = ({ user }: CommentsProps) => {
  const { query } = useRouter()

  const { data: comments } = useCommunityCommentsQuery(parseInt(query?.id as string), {
    enabled: Boolean(query?.id),
  })

  const toast = useToast()

  const { createComment, updateComment, deleteComment } = useCommentsManagement(Number(query?.id))

  const [isModalOpen, _, onModalOpen, onModalClose] = useBoolean(false)
  const [isDialogShowing, __, onDialogOpen, onDialogClose] = useBoolean(false)

  const [textValue, onChangeTextValue, resetValue, setTextValue] = useInput()

  const [isEditMode, setIsEditMode] = useState<{ isTrue: boolean; commentId: number | null }>({
    isTrue: false,
    commentId: null,
  })

  const handleInputClick = () => {
    console.log('first')
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
    setIsEditMode({ isTrue: false, commentId })
    onDialogOpen()
  }

  const handleDialogAction = () => {
    deleteComment({
      commentId: Number(isEditMode.commentId),
    })
    onDialogClose()
  }

  const handleDeclarationComment = () => {
    toast.error('준비중이에요', { icon: '🥹' })
  }

  const totalComments = useMemo(() => {
    let count = 0

    comments?.comments?.forEach(comment => {
      count++ // 댓글 개수 증가

      // 답글 개수 추가
      count += comment.childComments.length
    })

    return count
  }, [comments?.comments])

  return (
    <>
      <TextDrawer
        isOpen={isModalOpen}
        textValue={textValue}
        onChangeTextValue={onChangeTextValue}
        onSubmitTextValue={onSubmitTextValue}
        onClose={onModalClose}
      />
      {/* <S.GenerateCommentSection>
        <S.Comments>
          <S.Title>
            댓글 <b>{totalComments || 0}개</b>
          </S.Title>
          <S.InputCoverBtn onClick={handleInputClick}>
            <S.CommentInput placeholder="댓글을 입력해주세요." />
          </S.InputCoverBtn>
        </S.Comments>
      </S.GenerateCommentSection> */}

      <S.CommentListSection>
        {comments?.comments?.map(({ parentComment, childComments }, parentIdx) => {
          return (
            <>
              {parentComment?.status === 'DELETED' ? (
                <div key={parentComment?.id} css={S.commentBoxCss} data-status="delete">
                  <div css={S.commentTopInfoCss}>
                    <b>{parentComment.writer}</b>
                    <p>{getCurrentTime(parentComment.createdAt)}</p>
                  </div>
                  <pre>삭제된 댓글입니다.</pre>
                </div>
              ) : (
                <div key={parentComment?.id} css={S.commentBoxCss}>
                  <div css={S.commentTopInfoCss}>
                    <b>{parentComment.writer}</b>
                    <p>{getCurrentTime(parentComment.createdAt)}</p>
                  </div>
                  <pre>{parentComment.content}</pre>
                  <div css={S.commentBottomButtonGroupCss}>
                    {/* {parentComment?.createdBy !== user?.memberId && (
                      <button onClick={handleDeclarationComment}>신고</button>
                    )} */}
                    {/* <button onClick={handleGenerateChildComment(Number(parentComment.id))}>답글 쓰기</button> */}
                    {/* {parentComment?.createdBy === user?.memberId && (
                      <>
                        <button onClick={handleEditParentComment(Number(parentComment.id), parentIdx)}>수정</button>
                        <button onClick={handleDeleteComment(Number(parentComment.id))}>삭제</button>
                      </>
                    )} */}
                  </div>
                </div>
              )}
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
                      <div css={S.childCommentCss}>
                        <b>@{parentComment.writer}</b> <pre>{childComment.content}</pre>
                      </div>
                      <div css={S.commentBottomButtonGroupCss}>
                        {childComment?.createdBy !== user?.memberId && (
                          <button onClick={handleDeclarationComment}>신고</button>
                        )}
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
      <Dialog
        overrideCss={css`
          align-items: center;
        `}
        hasBlur={false}
        isMounted={isDialogShowing}
        onClickOutside={onDialogClose}
        title={<Dialog.Title>댓글을 삭제하시겠습니까?</Dialog.Title>}
        confirmButton={
          <Dialog.ConfirmButton label="삭제할게요" variant="primary" size="smd" onClick={handleDialogAction} />
        }
        cancelButton={<Dialog.CancelButton label="취소할게요" variant="outline" size="smd" onClick={onDialogClose} />}
      />
    </>
  )
}

export default Comments
