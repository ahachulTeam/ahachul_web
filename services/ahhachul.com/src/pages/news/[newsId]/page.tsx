import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useActivity, type ActivityComponentType } from '@stackflow/react';

import { ShareIcon } from '@/assets/icons/system';
import { LayoutComponent, UiComponent } from '@/components';
import { subwayIconMap } from '@/constants';

const NewsDetailPage: ActivityComponentType<{ newsId: number }> = ({
  params: { newsId },
}: {
  params: { newsId: number };
}) => {
  console.log('newsId:', newsId);
  const { isActive } = useActivity();
  const handleClickShare = () => {};
  const handleClickExternalLink = () => {};

  return (
    <LayoutComponent.Base>
      <>
        <UiComponent.AnimatePortal mounted={isActive}>
          <div key="header-actions">
            <HeaderContainer>
              <ShareActionButton type="button" onClick={handleClickShare}>
                <ShareIcon />
              </ShareActionButton>
              <ActionButton type="button" onClick={handleClickExternalLink}>
                기사원문 이동
              </ActionButton>
            </HeaderContainer>
          </div>
        </UiComponent.AnimatePortal>

        <ContentWrapper>
          <TitleWrapper>
            {'한밤 내복차림 지하철역 헤매던 90대…‘이것’ 때문에 무사 귀가한밤 내복차림'}
          </TitleWrapper>
          <MetaInfoWrapper>
            <AuthorDateWrapper>
              <SubwayLineWrapper>{subwayIconMap.get(2)}</SubwayLineWrapper>
              <DateText>{'2025.03.15. 오전 8:21'}</DateText>
            </AuthorDateWrapper>
          </MetaInfoWrapper>
        </ContentWrapper>

        {/* <UiComponent.ImageCarousel label={post.title} images={images} /> */}

        <ContentContainer>
          <TextContent>
            한밤중 지하철역을 헤매던 90대 치매 노인이 근무 중이던 역 직원의 도움을 받아 무사히
            집으로 돌아갔다.14일 서울교통공사에 따르면, 지난 10일 밤 23시 23분경 4호선
            동대문역사문화공원역에 근무하는 라광수 차장은 폐쇄회로(CC)TV로 감시 업무를 하던 중 내복
            차림의 노인이 8번 출구 계단을 걸어서 내려오는 것을 발견했다.신고를 받고 출동한 경찰은
            노인의 ‘치매노인 인식표’를 발견했고 보호자에게 바로 연락을 취했다. 이후 노인은 무사히
            가족과 만났다.라 차장은 “쌀쌀한 밤에 홀로 배회하는 노인을 처음 발견했을 때 7~8년간
            치매로 고생하신 어머니가 생각나 두유라도 하나 더 챙겨드리고 싶었다”며 “직원으로서 마땅히
            할 일을 한 것이고 늦지 않게 무사히 가족의 품으로 돌아가 다행”이라고 말했다. 마해근
            서울교통공사 영업본부장은 “늦은 밤에도 성실히 직무를 수행해 시민의 안전을 지킨 직원과
            동대문역사문화공원역 직원에게 감사하다”며 “역사 내 실종자 발생 시 보호자의 품으로
            하루빨리 돌아갈 수 있도록 매뉴얼을 바탕으로 전 직원이 노력하겠다”라고 말했다.
          </TextContent>
        </ContentContainer>
        <Padding />
      </>
    </LayoutComponent.Base>
  );
};

const ContentWrapper = styled.div`
  padding: 20px;
`;

const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.headlineMedium};
    font-weight: 400;
    color: #171717;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const MetaInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[20]};
`;

const AuthorDateWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyMedium};
    display: flex;
    align-items: center;
    gap: 4px;
  `}
`;

const DateText = styled.span`
  color: ${({ theme }) => theme.colors.gray[70]};
`;

const SubwayLineWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.labelMedium};
    display: flex;
    align-items: center;
    color: ${theme.colors.gray[90]};
    font-weight: 400;
  `}
`;

const ContentContainer = styled.div`
  padding: 0 20px;
`;

const TextContent = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.bodyLargeSemi};
    font-family: 'Pretendard';
    color: ${theme.colors.gray[90]};
    white-space: pre-wrap;
    word-break: break-all;
  `}
`;

const Padding = styled.div`
  width: 100%;
  height: 194px;
`;

const HeaderContainer = styled.section`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    right: 16px;
    background: ${theme.colors.white};
    z-index: ${theme.zIndex.header};
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  `}
`;

const ActionButton = styled.button`
  ${({ theme }) => css`
    ${theme.fonts.bodySmall};
    width: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 3px;
    border: 1px solid ${theme.colors.gray[40]};
    color: ${theme.colors.gray[90]};
    padding: 0 12px;
    background-color: white;
  `}
`;

const ShareActionButton = styled.button`
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default NewsDetailPage;
