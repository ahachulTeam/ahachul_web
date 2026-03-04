import { useEffect, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { fetchForeignerStationSocialHotspotsV2, type ForeignerLocale } from '@/apis/request/subway';
import { LayoutComponent } from '@/components';
import { useFlow } from '@/stackflow';
import { mixins } from '@/styles';
import { createActionLogger, resolveClientErrorMessage } from '@/utils/observability';

const languageExchangeLogger = createActionLogger('foreigner-language-exchange-page');

type ExchangePurpose = 'LANGUAGE_EXCHANGE' | 'FRIENDSHIP';

const LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: 'KO' },
  { value: 'th', label: 'TH' },
  { value: 'cn', label: 'CN' },
];

function resolvePurposeLabel(purpose: ExchangePurpose): string {
  return purpose === 'LANGUAGE_EXCHANGE' ? '언어교환' : '친목';
}

const ForeignerLanguageExchangePage: ActivityComponentType = () => {
  const { push, pop } = useFlow();
  const [locale, setLocale] = useState<ForeignerLocale>('en');

  const hotspotsQuery = useQuery({
    queryKey: ['foreigner', 'language-exchange', 'hotspots', locale],
    queryFn: () => fetchForeignerStationSocialHotspotsV2(locale),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    select: response => response.data.result,
  });

  useEffect(() => {
    if (!hotspotsQuery.error) {
      return;
    }

    languageExchangeLogger.fail(
      'load-language-exchange-hotspots',
      hotspotsQuery.error,
      { locale },
      '언어교환 허브 데이터를 불러오지 못했습니다.',
    );
  }, [hotspotsQuery.error, hotspotsQuery.errorUpdatedAt, locale]);

  const hotspots = hotspotsQuery.data?.hotspots ?? [];

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.HeaderTop>
            <S.Title>외국인-한국인 언어교환/친목 허브</S.Title>
            <S.HeaderActionRow>
              <S.SecondaryButton type="button" onClick={pop}>
                이전
              </S.SecondaryButton>
              <S.SecondaryButton
                type="button"
                onClick={() => push('ForeignerHotspotsPage', { locale })}
              >
                역 소셜 허브
              </S.SecondaryButton>
            </S.HeaderActionRow>
          </S.HeaderTop>
          <S.Description>
            한국인/외국인 누구나 방문해 언어교환 모임을 만들고 친목 모임으로 확장할 수 있습니다.
          </S.Description>
          <S.InfoBox>
            한국인: 배우고 싶은 언어로 모임을 열어보세요. 외국인: 한국어 또는 모국어 교환 파트너를
            빠르게 찾을 수 있습니다.
          </S.InfoBox>
          <S.LocaleRow>
            <S.LocaleSelect
              value={locale}
              onChange={event => setLocale(event.target.value as ForeignerLocale)}
            >
              {LOCALE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </S.LocaleSelect>
            <S.SecondaryButton type="button" onClick={() => void hotspotsQuery.refetch()}>
              새로고침
            </S.SecondaryButton>
          </S.LocaleRow>
        </S.HeaderCard>

        <S.ContentCard>
          {hotspotsQuery.isLoading ? (
            <S.HelperText>허브 목록을 불러오는 중입니다.</S.HelperText>
          ) : null}
          {hotspotsQuery.isError ? (
            <S.ErrorText>
              {resolveClientErrorMessage(
                hotspotsQuery.error,
                '허브 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
              )}
            </S.ErrorText>
          ) : null}
          {!hotspotsQuery.isLoading && !hotspotsQuery.isError && hotspots.length === 0 ? (
            <S.HelperText>노출 가능한 허브 역이 없습니다.</S.HelperText>
          ) : null}

          {!hotspotsQuery.isLoading && !hotspotsQuery.isError && hotspots.length > 0 ? (
            <S.HotspotList>
              {hotspots.map(hotspot => (
                <S.HotspotCard key={`language-exchange-${hotspot.stationId}`}>
                  <S.HotspotHeader>
                    <div>
                      <S.DistrictLabel>{hotspot.districtLabel}</S.DistrictLabel>
                      <S.HotspotTitle>
                        {hotspot.stationNameLocalized} · {hotspot.lineNameLocalized}
                      </S.HotspotTitle>
                    </div>
                    <S.MeetupBadge>모임 {hotspot.upcomingMeetupCount}</S.MeetupBadge>
                  </S.HotspotHeader>

                  <S.SummaryText>{hotspot.summary}</S.SummaryText>

                  <S.ActionRow>
                    {(['LANGUAGE_EXCHANGE', 'FRIENDSHIP'] as const).map(purpose => (
                      <S.PrimaryButton
                        key={`${hotspot.stationId}-${purpose}`}
                        type="button"
                        onClick={() =>
                          push('ForeignerHotspotDetailPage', {
                            stationId: hotspot.stationId,
                            subwayLineId: hotspot.subwayLineId,
                            locale,
                            purpose,
                          })
                        }
                      >
                        {resolvePurposeLabel(purpose)} 모임 열기
                      </S.PrimaryButton>
                    ))}
                  </S.ActionRow>
                </S.HotspotCard>
              ))}
            </S.HotspotList>
          ) : null}
        </S.ContentCard>
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.section`
    ${mixins.flexColumn};
    ${mixins.fullWidth};
    ${mixins.sideGutter};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
    gap: 12px;
  `,
  HeaderCard: styled.article`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 10px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 16px;
      background-color: ${theme.colors.white};
      padding: 16px;
    `}
  `,
  HeaderTop: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  `,
  HeaderActionRow: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  Title: styled.h1`
    ${({ theme }) => css`
      ${theme.fonts.titleLarge};
      color: ${theme.colors.gray[90]};
    `}
  `,
  Description: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  InfoBox: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.green[800]};
      border: 1px solid ${theme.colors.green[200]};
      border-radius: 10px;
      background-color: ${theme.colors.green[50]};
      padding: 8px 10px;
    `}
  `,
  LocaleRow: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  LocaleSelect: styled.select`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      height: 34px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 10px;
    `}
  `,
  SecondaryButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      height: 34px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 10px;
    `}
  `,
  ContentCard: styled.article`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 16px;
      background-color: ${theme.colors.white};
      padding: 12px;
    `}
  `,
  HotspotList: styled.ul`
    ${mixins.flexColumn};
    gap: 10px;
  `,
  HotspotCard: styled.li`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 12px;
      background-color: ${theme.colors.gray[10]};
      padding: 12px;
    `}
  `,
  HotspotHeader: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  `,
  DistrictLabel: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  HotspotTitle: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelLarge};
      color: ${theme.colors.gray[100]};
      margin-top: 2px;
    `}
  `,
  MeetupBadge: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors['key-color']};
      border-radius: 999px;
      background-color: ${theme.colors.white};
      color: ${theme.colors['key-color']};
      padding: 2px 8px;
    `}
  `,
  SummaryText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[80]};
    `}
  `,
  ActionRow: styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  `,
  PrimaryButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      height: 36px;
      border-radius: 10px;
      border: 1px solid ${theme.colors.gray[30]};
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 10px;
    `}
  `,
  HelperText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  ErrorText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.red[60]};
    `}
  `,
};

export default ForeignerLanguageExchangePage;
