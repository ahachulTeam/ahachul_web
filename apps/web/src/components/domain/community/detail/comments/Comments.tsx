import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import * as S from './styled'
import { useCommunityPostComments } from '@/queries/community/useCommunityComments'

const defaultInputHeight = 44

function Comments() {
  const { query } = useRouter()
  const [text, setText] = useState('')
  const [inputHeight, setInputHeight] = useState(defaultInputHeight)

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setText(p => {
        return p + '\n'
      })
      setInputHeight(p => p + 16)
    }
  }

  const { mutate: createComment } = useCommunityPostComments()

  const submitComment = () => {
    const req = {
      postId: Number(query?.id),
      content: text,
    }
    createComment(req)
  }

  return (
    <S.Comments>
      <S.Title>
        댓글 <b>2개</b>
      </S.Title>
      <S.CommentInput
        placeholder="댓글을 입력해주세요."
        css={css`
          height: ${inputHeight}px;
        `}
        value={text}
        onChange={handleChangeSearchValue}
        onKeyDown={handleInputKeyDown}
      />
      <button onClick={submitComment}>댓글 달기</button>
    </S.Comments>
  )
}

export default Comments
