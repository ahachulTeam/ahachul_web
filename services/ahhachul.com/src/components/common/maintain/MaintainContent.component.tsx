import styled from '@emotion/styled';

import { MaintainStatusIcon } from '@/assets/icons/system';
import { useFlow } from '@/stackflow';

const MaintainContent = ({ actionLabel = '홈으로' }: { actionLabel?: string }) => {
  const { pop } = useFlow();
  const handleBack = () => pop();

  return (
    <Container>
      <ContentWrapper>
        <MaintainStatusIcon />

        <Title>기능 준비 중입니다</Title>
        <Message>{'더 나은 서비스 제공을 위해\n해당 기능의 업데이트를 진행하고 있습니다.'}</Message>
        <ButtonGroup>
          <HomeButton onClick={handleBack}>{actionLabel}</HomeButton>
        </ButtonGroup>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 58px);
  background-color: white;
  padding: 24px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -60px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: var(--ah-color-legacy-text-heading);
  margin-top: 10px;
  margin-bottom: 12px;
  text-align: center;
  line-height: 28px;
  letter-spacing: -0.2px;
`;

const Message = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  letter-spacing: -0.2px;
  color: var(--ah-color-legacy-text-faint);
  text-align: center;
  margin-bottom: 24px;
  white-space: break-spaces;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 154px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  flex: 1;
  padding: 15px 0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: white;
`;

const HomeButton = styled(Button)`
  border: 1px solid var(--ah-color-legacy-border-subtle);
  color: var(--ah-color-legacy-text-body);
`;

export default MaintainContent;
