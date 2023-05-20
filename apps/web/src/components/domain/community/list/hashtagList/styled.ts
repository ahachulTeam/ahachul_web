import styled from '@emotion/styled'

export const HashtagList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  column-gap: 10px;
  overflow-x: overlay;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`
