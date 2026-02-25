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

const foreignerHotspotsLogger = createActionLogger('foreigner-hotspots-page');

const LOCALE_OPTIONS: Array<{ value: ForeignerLocale; label: string }> = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: 'KO' },
  { value: 'th', label: 'TH' },
  { value: 'cn', label: 'CN' },
];

type ForeignerHotspotsPageParams = {
  locale?: ForeignerLocale;
};

const ForeignerHotspotsPage: ActivityComponentType<ForeignerHotspotsPageParams> = ({
  params,
}: {
  params: ForeignerHotspotsPageParams;
}) => {
  const { push } = useFlow();
  const [locale, setLocale] = useState<ForeignerLocale>(params.locale ?? 'en');

  const hotspotsQuery = useQuery({
    queryKey: ['foreigner', 'station-social', 'hotspots', locale],
    queryFn: () => fetchForeignerStationSocialHotspotsV2(locale),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    select: response => response.data.result,
  });

  useEffect(() => {
    if (!hotspotsQuery.error) {
      return;
    }
    foreignerHotspotsLogger.fail(
      'load-hotspots',
      hotspotsQuery.error,
      { locale },
      '외국인 역 소셜 허브 목록을 불러오지 못했습니다.',
    );
  }, [hotspotsQuery.error, hotspotsQuery.errorUpdatedAt, locale]);

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.Title>외국인 역 소셜 허브</S.Title>
          <S.Description>
            명동/성수/홍대입구/강남/안국 중심으로 모임, 후기, 문화 안내를 확인하고 바로 연결할 수
            있습니다.
          </S.Description>
          <S.HeaderActions>
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
            <S.RefreshButton type="button" onClick={() => void hotspotsQuery.refetch()}>
              새로고침
            </S.RefreshButton>
          </S.HeaderActions>
        </S.HeaderCard>

        <S.ListCard>
          {hotspotsQuery.isLoading ? (
            <S.HelperText>핫스팟 목록을 불러오는 중입니다.</S.HelperText>
          ) : null}

          {hotspotsQuery.isError ? (
            <S.ErrorText>
              {resolveClientErrorMessage(
                hotspotsQuery.error,
                '핫스팟 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.',
              )}
            </S.ErrorText>
          ) : null}

          {!hotspotsQuery.isLoading &&
          !hotspotsQuery.isError &&
          hotspotsQuery.data.hotspots.length === 0 ? (
            <S.HelperText>현재 노출 가능한 핫스팟이 없습니다.</S.HelperText>
          ) : null}

          {!hotspotsQuery.isLoading &&
          !hotspotsQuery.isError &&
          hotspotsQuery.data.hotspots.length > 0 ? (
            <S.HotspotList>
              {hotspotsQuery.data.hotspots.map(hotspot => (
                <S.HotspotButton
                  key={hotspot.stationId}
                  type="button"
                  onClick={() =>
                    push('ForeignerHotspotDetailPage', {
                      stationId: hotspot.stationId,
                      subwayLineId: hotspot.subwayLineId,
                      locale,
                    })
                  }
                >
                  <S.HotspotHeader>
                    <div>
                      <S.DistrictLabel>{hotspot.districtLabel}</S.DistrictLabel>
                      <S.HotspotTitle>
                        {hotspot.stationNameLocalized} · {hotspot.lineNameLocalized}
                      </S.HotspotTitle>
                    </div>
                    <S.MeetupCount>모임 {hotspot.upcomingMeetupCount}</S.MeetupCount>
                  </S.HotspotHeader>

                  <S.MetaText>Romanized: {hotspot.romanizedName}</S.MetaText>
                  <S.SummaryText>{hotspot.summary}</S.SummaryText>

                  <S.TagList>
                    {hotspot.contentTags.map(tag => (
                      <S.Tag key={`${hotspot.stationId}-${tag}`}>#{tag}</S.Tag>
                    ))}
                  </S.TagList>
                </S.HotspotButton>
              ))}
            </S.HotspotList>
          ) : null}
        </S.ListCard>
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
      gap: 8px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 16px;
      background-color: ${theme.colors.white};
      padding: 16px;
    `}
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
  HeaderActions: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  LocaleSelect: styled.select`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      height: 32px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 8px;
    `}
  `,
  RefreshButton: styled.button`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      height: 32px;
      border: 1px solid ${theme.colors.gray[40]};
      border-radius: 10px;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray[90]};
      padding: 0 10px;
    `}
  `,
  ListCard: styled.article`
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
  HotspotButton: styled.button`
    ${({ theme }) => css`
      ${mixins.flexColumn};
      gap: 6px;
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 12px;
      background-color: ${theme.colors.gray[10]};
      text-align: left;
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
  MeetupCount: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors['key-color']};
      border-radius: 999px;
      color: ${theme.colors['key-color']};
      background-color: ${theme.colors.white};
      padding: 2px 8px;
    `}
  `,
  MetaText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[70]};
    `}
  `,
  SummaryText: styled.p`
    ${({ theme }) => css`
      ${theme.fonts.bodySmall};
      color: ${theme.colors.gray[80]};
    `}
  `,
  TagList: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 2px;
  `,
  Tag: styled.span`
    ${({ theme }) => css`
      ${theme.fonts.labelSmall};
      border: 1px solid ${theme.colors.gray[30]};
      border-radius: 999px;
      color: ${theme.colors.gray[80]};
      background-color: ${theme.colors.white};
      padding: 1px 8px;
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

export default ForeignerHotspotsPage;
