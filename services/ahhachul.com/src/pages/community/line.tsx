import React, { useMemo, useReducer } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';

import { CommunityComponent, HeaderComponent, LayoutComponent, UiComponent } from '@/components';
import { APP_UNIQUE_FILTER_ID_LIST } from '@/constants/filter';
import { useCommunityFilters } from '@/hooks/domain/community';
import { SubwayLineFilterOptions } from '@/types';
import type { CommunitySubwayLineFilterValue } from '@/types/community';

const SearchedListSkeleton = React.lazy(
  () => import('@/components/domain/community/searchResults/skeleton/SearchedList.skeleton'),
);
const SearchedList = React.lazy(
  () => import('@/components/domain/community/searchResults/searchedList/SearchedList.component'),
);

type CommunityLinePageParams = {
  subwayLineId: number;
  lineName?: string;
  keyword?: string;
};

const CommunityLinePage: ActivityComponentType<CommunityLinePageParams> = ({
  params,
}: {
  params: CommunityLinePageParams;
}) => {
  const [isScale, toggleScale] = useReducer(scale => !scale, false);
  const selectedLineId = Number(params.subwayLineId ?? 0);
  const lineName =
    params.lineName ??
    (Number.isInteger(selectedLineId) && selectedLineId > 0 ? `${selectedLineId}호선` : '호선');
  const selectedLineFilterValue =
    Number.isInteger(selectedLineId) && selectedLineId > 0
      ? (String(selectedLineId) as CommunitySubwayLineFilterValue)
      : SubwayLineFilterOptions.ALL_LINES;

  const scopedDefaultFilters = useMemo(
    () => ({
      subwayLineId: selectedLineFilterValue,
      stationId: '0',
    }),
    [selectedLineFilterValue],
  );

  const { loaded, keyword, filters, boundaryKeys, getFilterProps } = useCommunityFilters({
    uniqueId: APP_UNIQUE_FILTER_ID_LIST.CommunityLinePage,
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
          searchInputUniqueId={APP_UNIQUE_FILTER_ID_LIST.CommunityLinePage}
          {...getFilterProps()}
        />
      }
    >
      <S.ScopeSummary>
        <b>{lineName} 커뮤니티</b>
        <span>해당 호선 중심 인기글과 필터 결과를 확인할 수 있습니다.</span>
      </S.ScopeSummary>

      <CommunityComponent.CommunityReliabilitySignal
        subwayLineFilterValue={filters.subwayLineId}
        fallbackSubwayLineId={selectedLineId}
        stationId={Number(filters.stationId)}
        scopeLabel={
          Number(filters.stationId) > 0 ? '역 범위 지연 신뢰 신호' : '호선 범위 지연 신뢰 신호'
        }
      />

      <UiComponent.SuspenseQueryBoundary
        keys={boundaryKeys}
        errorFallback={({ reset }) => (
          <UiComponent.AppErrorFallback
            title="호선 커뮤니티 목록을 불러오지 못했습니다."
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

export default CommunityLinePage;
