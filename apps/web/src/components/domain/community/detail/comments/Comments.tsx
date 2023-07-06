import { useBoolean } from '@ahhachul/lib'
import { useRouter } from 'next/router'
import * as S from './styled'
import TextDrawer from '@/components/common/drawer/text/TextDrawer'
import useInput from '@/hooks/useInput'
import { useCommunityPostComments } from '@/queries/community/useCommunityComments'

function Comments() {
  const { query } = useRouter()

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

  const { mutate: createComment } = useCommunityPostComments()

  return (
    <>
      <S.Comments>
        <S.Title>
          댓글 <b>2개</b>
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
    </>
  )
}

export default Comments
