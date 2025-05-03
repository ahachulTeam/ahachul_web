import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChevronIcon } from '@/assets/icons/system';
import { useToast } from '@/hooks/useToast';

import deps from '../../../../package.json';

const menuSections = [
  { label: '알림 설정', to: '/all/settings/notifications' },
  { label: '약관 및 이용 동의', to: '/all/terms' },
];

const MenuSections = () => {
  const { addToast } = useToast();

  const showToast = () => addToast('준비중인 기능입니다.', 'info');

  // const { handleClickOpenKakao } = useKakaoChannel();

  return (
    <SectionsList>
      <SectionsBox>
        {menuSections.map((section, index) => (
          <Section key={index} onClick={showToast}>
            <p>{section.label}</p>
            <ChevronIcon />
          </Section>
        ))}

        <Section>
          <p>앱 버전</p>
          <p style={{ color: '#70747D' }}>{deps.version}</p>
        </Section>
      </SectionsBox>
      <SectionsBox>
        <SectionCs>
          <h3
            css={css`
              color: #26282b;
              line-height: 24px;
            `}
          >
            고객센터
          </h3>
          <p
            css={css`
              color: #838791;
              margin: 0 0 14px;
              line-height: 24px;
            `}
          >
            서비스 관련 문의는 아하철 카카오 고객센터 챗봇을 이용해주세요
          </p>
          <button
            // onClick={handleClickOpenKakao}
            onClick={showToast}
            css={css`
              font-weight: 600;
              color: #004fec;
              border: 1px solid #004fec;
              border-radius: 8px;
              width: 100%;
              height: 40px;
              padding: 0 16px;
            `}
          >
            서비스 문의하기
          </button>
        </SectionCs>
      </SectionsBox>
    </SectionsList>
  );
};

const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  & > div > h4 {
    font-weight: 500;
  }
`;

const SectionsBox = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  p {
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
    color: #26282b;
  }

  & > svg {
    transform: rotate(270deg);
  }
`;

const SectionCs = styled.div`
  padding: 16px 0;
`;

export default MenuSections;
