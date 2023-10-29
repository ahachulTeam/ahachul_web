import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { DUMMY_DM_CONTENTS } from '@/assets/dummy/alarm'

const DirectMessages = () => {
  return (
    <NoticeAlarmList>
      {DUMMY_DM_CONTENTS.map(dm => (
        <Alarm key={dm.id} aria-checked={dm.hasNewMessage}>
          <article>
            <Flex>
              <Nickname>{dm.nickname}</Nickname>
            </Flex>
            <Content>{dm.content}</Content>
            <Flex>
              <Category>마지막 쪽지:</Category>
              <Time>{dm.created}</Time>
            </Flex>
          </article>
        </Alarm>
      ))}
    </NoticeAlarmList>
  )
}

const NoticeAlarmList = styled.ul`
  width: 100%;
`

const Alarm = styled.li`
  cursor: pointer;

  &[aria-checked='true'] {
    background-color: #d0eeff;
  }

  & > article {
    width: 100%;
    padding: 17px 15px 19px 15px;
  }
`
const Nickname = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.medium16};
    margin-bottom: 8px;
    color: ${theme.colors.black};
  `}
`

const Content = styled.p`
  ${({ theme }) => css`
    ${theme.fonts.regular14};
    max-width: 74%;
    margin-bottom: 4px;
    color: ${theme.colors.black};
  `}
`

const Flex = styled.span`
  display: flex;
`

const Category = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    width: max-content;
    color: ${theme.colors.gray_45};
    margin-right: 2px;
  `}
`

const Time = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.regular12};
    color: ${theme.colors.gray_45};
  `}
`

export default DirectMessages
