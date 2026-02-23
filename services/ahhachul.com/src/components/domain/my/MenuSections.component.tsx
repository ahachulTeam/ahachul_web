import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ChevronIcon } from '@/assets/icons/system';
import { useToast } from '@/hooks/useToast';

import deps from '../../../../package.json';

const menuSections = [
  { label: '알림 설정', to: '/all/settings/notifications' },
  { label: '약관 및 이용 동의', to: '/all/terms' },
];

const POLICY_LINKS = {
  terms: import.meta.env.VITE_AHHACHUL_TERMS_URL ?? 'https://ahhachul.com/terms',
  privacy: import.meta.env.VITE_AHHACHUL_PRIVACY_URL ?? 'https://ahhachul.com/privacy',
};

const MenuSections = () => {
  const { addToast } = useToast();

  const showToast = () => addToast('준비중인 기능입니다.', 'info');
  const openPolicy = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
          <p style={{ color: 'var(--ah-color-legacy-text-muted)' }}>{deps.version}</p>
        </Section>
      </SectionsBox>
      <SectionsBox>
        <SectionCs>
          <h3
            css={css`
              color: var(--ah-color-legacy-text-strong);
              line-height: 24px;
            `}
          >
            고객센터
          </h3>
          <p
            css={css`
              color: var(--ah-color-legacy-text-muted-secondary);
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
              color: var(--ah-color-legacy-text-link);
              border: 1px solid var(--ah-color-legacy-text-link);
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
      <SectionsBox>
        <SectionCs>
          <h3
            css={css`
              color: var(--ah-color-legacy-text-strong);
              line-height: 24px;
            `}
          >
            아하철 앱 정책
          </h3>
          <p
            css={css`
              color: var(--ah-color-legacy-text-muted-secondary);
              margin: 0 0 14px;
              line-height: 24px;
            `}
          >
            서비스 이용약관과 개인정보처리방침을 확인할 수 있습니다.
          </p>
          <div
            css={css`
              display: flex;
              gap: 8px;
            `}
          >
            <button
              onClick={() => openPolicy(POLICY_LINKS.terms)}
              css={css`
                flex: 1;
                font-weight: 600;
                color: var(--ah-color-legacy-text-link);
                border: 1px solid var(--ah-color-legacy-text-link);
                border-radius: 8px;
                height: 40px;
              `}
            >
              이용약관
            </button>
            <button
              onClick={() => openPolicy(POLICY_LINKS.privacy)}
              css={css`
                flex: 1;
                font-weight: 600;
                color: var(--ah-color-legacy-text-link);
                border: 1px solid var(--ah-color-legacy-text-link);
                border-radius: 8px;
                height: 40px;
              `}
            >
              개인정보처리방침
            </button>
          </div>
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
    color: var(--ah-color-legacy-text-strong);
  }

  & > svg {
    transform: rotate(270deg);
  }
`;

const SectionCs = styled.div`
  padding: 16px 0;
`;

export default MenuSections;
