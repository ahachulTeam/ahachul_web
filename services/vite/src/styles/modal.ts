import styled from '@emotion/styled'

export const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`
