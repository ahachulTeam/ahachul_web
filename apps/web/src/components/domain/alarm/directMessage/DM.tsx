import * as S from './styled'
import { DUMMY_DM_CONTENTS } from '@/assets/dummy/alarm'

export const DM = () => {
  return (
    <S.NoticeAlarmList>
      {DUMMY_DM_CONTENTS.map(dm => (
        <S.Alarm key={dm.id} aria-checked={dm.hasNewMessage}>
          <article>
            <S.Flex>
              <S.Nickname>{dm.nickname}</S.Nickname>
            </S.Flex>
            <S.Content>{dm.content}</S.Content>
            <S.Flex>
              <S.Category>마지막 쪽지:</S.Category>
              <S.Time>{dm.created}</S.Time>
            </S.Flex>
          </article>
        </S.Alarm>
      ))}
    </S.NoticeAlarmList>
  )
}
