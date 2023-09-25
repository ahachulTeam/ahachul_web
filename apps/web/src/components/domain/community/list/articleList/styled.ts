import styled from '@emotion/styled'

export const ArticleList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px 20px;

  & > li:not(:last-of-type) {
    border-bottom: 1px solid #ececec;
  }
`
