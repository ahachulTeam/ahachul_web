import styled from '@emotion/styled';

import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';

import { MY_DARK_COLORS } from './myDesignTokens';

type RequestCardProps = {
  onMoveMobility?: () => void;
  onMoveActivity?: () => void;
  onMoveSettings?: () => void;
};

const RequestCard = ({ onMoveMobility, onMoveActivity, onMoveSettings }: RequestCardProps) => {
  const { push } = useFlow();
  const { addToast } = useToast();

  const showToast = () => addToast('준비중인 기능입니다.', 'info');

  return (
    <Wrapper>
      <Header>
        <h3>빠른 이동</h3>
        <button type="button" onClick={onMoveMobility}>
          전체 보기
        </button>
      </Header>

      <Grid>
        <CardButton type="button" onClick={() => push('SettingPage', {})}>
          <small>즐겨찾기 역 관리</small>
          <strong>집/회사/학교 동선</strong>
        </CardButton>
        <CardButton type="button" onClick={() => push('DelayCenterPage', {})}>
          <small>출퇴근 코치</small>
          <strong>오늘 리스크 확인</strong>
        </CardButton>
        <CardButton type="button" onClick={onMoveActivity}>
          <small>내 활동 히스토리</small>
          <strong>좋아요/북마크/댓글</strong>
        </CardButton>
        <CardButton type="button" onClick={onMoveSettings ?? showToast}>
          <small>공개 범위 설정</small>
          <strong>프로필 미리보기</strong>
        </CardButton>
      </Grid>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;

  h3 {
    font-size: 14px;
    font-weight: 800;
    color: ${MY_DARK_COLORS.title};
  }

  button {
    font-size: 12px;
    color: ${MY_DARK_COLORS.accent};
    background: transparent;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
`;

const CardButton = styled.button`
  border-radius: 14px;
  border: 1px solid ${MY_DARK_COLORS.sectionCardBorder};
  background: ${MY_DARK_COLORS.sectionCardBg};
  min-height: 59px;
  padding: 12px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 5px;

  small {
    font-size: 11px;
    color: ${MY_DARK_COLORS.muted};
  }

  strong {
    font-size: 14px;
    line-height: 1.2;
    color: ${MY_DARK_COLORS.title};
    font-weight: 700;
  }
`;

export default RequestCard;
