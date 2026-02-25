import styled from '@emotion/styled';

import { AppLinkIcon, QnaIcon } from '@/assets/icons/my';
import { useToast } from '@/hooks/useToast';
import { useFlow } from '@/stackflow';

const RequestCard = () => {
  const { push } = useFlow();
  const { addToast } = useToast();

  const handleSettingPage = () => push('SettingPage', {});
  const handleDelayCenterPage = () => push('DelayCenterPage', {});
  const showToast = () => addToast('준비중인 기능입니다.', 'info');

  return (
    <Wrapper>
      <button onClick={handleSettingPage}>
        <AppLinkIcon />
        <p>즐겨찾는 역 관리</p>
      </button>

      <div className="divider" />

      <button onClick={handleDelayCenterPage}>
        <AppLinkIcon />
        <p>지연/사고 센터</p>
      </button>

      <div className="divider" />

      <button onClick={showToast}>
        <QnaIcon />
        <p>문의사항 관리</p>
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: var(--ah-color-legacy-surface-brand-tint);
  padding: 4px 0;
  border-radius: 8px;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    outline: none;
    border: none;
    background-color: inherit;
  }

  div.divider {
    width: 1px;
    height: 24px;
    background: var(--ah-color-legacy-surface-brand-divider);
    border-radius: 2px;
  }

  p {
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    margin-left: 10px;
    color: var(--ah-color-legacy-text-body);
  }
`;

export default RequestCard;
