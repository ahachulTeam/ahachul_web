import React, { useMemo, useReducer } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { CommunityComponent, HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useCommunityFilters } from '@/hooks/domain/community';
import { SubwayLineFilterOptions } from '@/types';
import type {
  CommunityStationFilterValue,
  CommunitySubwayLineFilterValue,
} from '@/types/community';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/community/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/community/searchResults/searchedList/SearchedList.component'),
);

type CommunityStationPageParams = {
  stationId: number;
  stationName?: string;
  subwayLineId?: number | string;
  lineName?: string;
  keyword?: string;
};

const CommunityStationPage: ActivityComponentType<CommunityStationPageParams> = ({
  params,
}: {
  params: CommunityStationPageParams;
}) => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);
  const stationId = Number(params.stationId ?? 0);
  const stationName = params.stationName ?? `${stationId}`;
  const selectedLineId = Number(params.subwayLineId ?? 0);
  const selectedLineFilterValue =
    Number.isInteger(selectedLineId) && selectedLineId > 0
      ? (String(selectedLineId) as CommunitySubwayLineFilterValue)
      : SubwayLineFilterOptions.ALL_LINES;

  const scopedDefaultFilters = useMemo(
    () => ({
      stationId: (stationId > 0 ? String(stationId) : '0') as CommunityStationFilterValue,
      subwayLineId: selectedLineFilterValue,
    }),
    [selectedLineFilterValue, stationId],
  );

  const { loaded, keyword, filters, boundaryKeys, getFilterProps } = useCommunityFilters({
    uniqueId: APP_UNIQUE_FILTER_ID_LIST.CommunityStationPage,
    defaultFilters: scopedDefaultFilters,
  });

  if (!loaded) {
    return <UiComponent.LoadingSpinner opacity={0.1} />;
  }

  return (
    <LayoutComponent.Composed
      appBar={{
        renderLeft: HeaderComponent.HeaderBrand,
        renderRight: HeaderComponent.HeaderActions,
      }}
      outerChildren={
        <CommunityComponent.FilterList
          isScale={isScale}
          toggleScale={toggleScale}
          searchInputUniqueId={APP_UNIQUE_FILTER_ID_LIST.CommunityStationPage}
          {...getFilterProps()}
        />
      }
    >
      <S.ScopeSummary>
        <b>{stationName}역 커뮤니티</b>
        <span>해당 역 중심 인기글과 필터 결과를 확인할 수 있습니다.</span>
      </S.ScopeSummary>

      <CommunityComponent.CommunityReliabilitySignal
        subwayLineFilterValue={filters.subwayLineId}
        fallbackSubwayLineId={selectedLineId}
        stationId={stationId}
        scopeLabel="역 범위 지연 신뢰 신호"
      />

      <UiComponent.SuspenseQueryBoundary
        keys={boundaryKeys}
        errorFallback={({ reset }) => (
          <UiComponent.AppErrorFallback
            title="역 커뮤니티 목록을 불러오지 못했습니다."
            description="잠시 후 다시 시도해주세요."
            onAction={reset}
          />
        )}
        suspenseFallback={<SearchedListSkeleton isScale={isScale} />}
      >
        <SearchedList keyword={keyword} filters={filters} isScale={isScale} />
      </UiComponent.SuspenseQueryBoundary>

      <UiComponent.NewButton activityName="NewCommunityPage" />
    </LayoutComponent.Composed>
  );
};

const S = {
  ScopeSummary: styled.section`
    ${({ theme }) => css`
      padding: 14px 20px 6px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      > b {
        ${theme.fonts.titleSmall};
        color: ${theme.colors.gray[100]};
      }

      > span {
        ${theme.fonts.bodySmall};
        color: ${theme.colors.gray[70]};
      }
    `}
  `,
};

export default CommunityStationPage;
