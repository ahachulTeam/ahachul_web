import styled from '@emotion/styled';

import { useFlow } from '@/stackflow';

const MaintainContent = ({ actionLabel = '홈으로' }: { actionLabel?: string }) => {
  const { pop } = useFlow();
  const handleBack = () => pop();

  return (
    <Container>
      <ContentWrapper>
        <svg
          width="49"
          height="48"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="24" r="20" fill="var(--ah-color-legacy-status-accent-blue)" />
          <path
            d="M26.8487 31.8551C26.8488 32.1735 26.7861 32.4888 26.6643 32.783C26.5425 33.0772 26.364 33.3446 26.1388 33.5697C25.9137 33.7949 25.6464 33.9736 25.3523 34.0954C25.0581 34.2173 24.7428 34.28 24.4244 34.28C24.1059 34.28 23.7906 34.2173 23.4965 34.0954C23.2023 33.9736 22.935 33.7949 22.7099 33.5697C22.4848 33.3446 22.3062 33.0772 22.1844 32.783C22.0626 32.4888 21.9999 32.1735 22 31.8551C21.9999 31.5367 22.0626 31.2214 22.1844 30.9272C22.3062 30.633 22.4848 30.3656 22.7099 30.1405C22.935 29.9153 23.2023 29.7367 23.4965 29.6148C23.7906 29.4929 24.1059 29.4302 24.4244 29.4302C24.7428 29.4302 25.0581 29.4929 25.3523 29.6148C25.6464 29.7367 25.9137 29.9153 26.1388 30.1405C26.364 30.3656 26.5425 30.633 26.6643 30.9272C26.7861 31.2214 26.8488 31.5367 26.8487 31.8551Z"
            fill="white"
            stroke="black"
            strokeOpacity="0.4"
            strokeWidth="0.032134"
            strokeLinecap="square"
          />
          <path
            d="M24.4249 14C23.1039 14 22.0405 15.086 22.0405 16.4349L22.7455 24.9644C22.8802 26.0677 22.9952 26.6928 23.4505 26.9868C23.7479 27.1223 24.0772 27.1993 24.4249 27.1993C24.7709 27.1993 25.0989 27.1231 25.3951 26.9889C25.853 26.6958 25.9693 26.0702 26.1043 24.9644L26.8093 16.4349C26.8093 15.086 25.7459 14 24.4249 14Z"
            fill="white"
          />
        </svg>

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
