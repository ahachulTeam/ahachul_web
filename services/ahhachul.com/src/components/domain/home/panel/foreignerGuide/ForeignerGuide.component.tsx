import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@ahhachul/domain';

import { fetchForeignerStationGuideV2, type ForeignerLocale } from '@/apis/request/subway';
import { StackFlow } from '@/stackflow';
import { useUserStationStore } from '@/stores/subway';
import { createActionLogger } from '@/utils/observability';

import * as S from './ForeignerGuide.styled';

const homeForeignerGuideLogger = createActionLogger('home-foreigner-guide');
const DEFAULT_FOREIGNER_LOCALE: ForeignerLocale = 'en';

const ForeignerGuide = () => {
  const { userStations } = useUserStationStore(state => state);
  const station = userStations[0];
  const stationId = station?.stationId ?? 0;
  const subwayLineId = Number(station?.subwayLineInfoList?.[0]?.subwayLineId ?? 0);

  const guideQuery = useQuery({
    queryKey: ['home', 'foreigner-guide', stationId, subwayLineId, DEFAULT_FOREIGNER_LOCALE],
    enabled: stationId > 0 && subwayLineId > 0,
    queryFn: () =>
      fetchForeignerStationGuideV2({
        stationId,
        subwayLineId,
        locale: DEFAULT_FOREIGNER_LOCALE,
      }),
    staleTime: QUERY_STALE_TIME.feed,
    gcTime: QUERY_GC_TIME.feed,
    select: response => response.data.result,
  });

  useEffect(() => {
    if (!guideQuery.error) {
      return;
    }

    homeForeignerGuideLogger.fail(
      'load-foreigner-guide',
      guideQuery.error,
      {
        stationId,
        subwayLineId,
        locale: DEFAULT_FOREIGNER_LOCALE,
      },
      '홈 외국인 모드 가이드를 불러오지 못했습니다.',
    );
  }, [guideQuery.error, guideQuery.errorUpdatedAt, stationId, subwayLineId]);

  if (stationId <= 0 || subwayLineId <= 0) {
    return null;
  }

  const guide = guideQuery.data;

  return (
    <S.Container>
      <S.Header>
        <b>외국인 모드 가이드</b>
        <S.ActionGroup>
          <StackFlow.Link
            activityName="ForeignerLanguageExchangePage"
            activityParams={{ locale: 'en' }}
          >
            <S.ActionButton type="button">언어교환 허브</S.ActionButton>
          </StackFlow.Link>
          <StackFlow.Link activityName="ForeignerHotspotsPage" activityParams={{ locale: 'en' }}>
            <S.ActionButton type="button">역 소셜 허브</S.ActionButton>
          </StackFlow.Link>
        </S.ActionGroup>
      </S.Header>
      <S.Card>
        {guideQuery.isLoading ? (
          <S.StateText>외국인 안내 정보를 불러오는 중입니다.</S.StateText>
        ) : null}
        {guideQuery.isError ? (
          <S.ErrorText>외국인 안내 정보를 불러오지 못했습니다.</S.ErrorText>
        ) : null}

        {!guideQuery.isLoading && !guideQuery.isError && guide ? (
          <>
            <S.Headline>
              {guide.station.nameLocalized} · {guide.station.subwayLineNameLocalized}
            </S.Headline>
            <S.Meta>Romanized: {guide.station.romanizedName}</S.Meta>
            <S.Meta>Pronunciation: {guide.station.pronunciation}</S.Meta>
            <S.Tips>
              <li>{guide.cultureGuide.lastTrainTip}</li>
              <li>{guide.cultureGuide.transferEtiquetteTip}</li>
              <li>{guide.cultureGuide.safetyTip}</li>
            </S.Tips>
          </>
        ) : null}
      </S.Card>
    </S.Container>
  );
};

export default ForeignerGuide;
