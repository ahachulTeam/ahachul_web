type SubwayLineFilterOptionValue = string | number;

interface FormatSubwayFilterOptionConfig<TFilter extends SubwayLineFilterOptionValue> {
  allLinesOption?: TFilter;
  onlyMyLineOption?: TFilter;
  allLinesValue?: number;
}

interface SubwayStationLike {
  id: number;
  name: string;
}

interface SubwayLineLike {
  id: number;
  name: string;
  stations?: SubwayStationLike[] | null;
}

interface SubwayLineResponseLike {
  subwayLines?: SubwayLineLike[] | null;
}

interface UserStationInfoLike {
  subwayLineId: string | number;
}

interface UserStationLike {
  subwayLineInfoList?: UserStationInfoLike[] | null;
}

export interface ParentLineStationInfo {
  stationId: number;
  parentLineId: number;
  parentLineNames: string;
}

export type FormattedSubwayStations = Record<string, ParentLineStationInfo[]>;

export interface FormatSubwayArrivalTimeOptions {
  arrivalThresholdSeconds?: number;
  arrivalText?: string;
  invalidText?: string;
}

export function formatSubwayFilterOption<TFilter extends SubwayLineFilterOptionValue>(
  lineFilter: TFilter,
  favoriteLines?: string | number,
  config: FormatSubwayFilterOptionConfig<TFilter> = {},
): number | string | undefined {
  const {
    allLinesOption = 'ALL_LINES' as TFilter,
    onlyMyLineOption = 'ONLY_MY_LINE' as TFilter,
    allLinesValue = 0,
  } = config;

  if (lineFilter === allLinesOption) {
    return allLinesValue;
  }

  if (lineFilter === onlyMyLineOption) {
    return favoriteLines;
  }

  return undefined;
}

export function formatSubwayLineInfo(
  subwayResponse: SubwayLineResponseLike | null | undefined,
): FormattedSubwayStations {
  if (!subwayResponse?.subwayLines?.length) {
    return {};
  }

  return subwayResponse.subwayLines.reduce<FormattedSubwayStations>((acc, line) => {
    line.stations?.forEach(station => {
      const stationName = station.name;
      if (!stationName) return;

      const stationInfo: ParentLineStationInfo = {
        stationId: station.id,
        parentLineId: line.id,
        parentLineNames: line.name,
      };

      if (!acc[stationName]) {
        acc[stationName] = [stationInfo];
        return;
      }

      acc[stationName] = [...acc[stationName], stationInfo];
    });

    return acc;
  }, {});
}

export function getFirstParentLineId(stations: UserStationLike[] | null | undefined): string {
  const firstStationLineInfoList = stations?.[0]?.subwayLineInfoList;
  if (!firstStationLineInfoList?.length) {
    return '';
  }

  return firstStationLineInfoList
    .map(station => station.subwayLineId)
    .filter((lineId): lineId is string | number => lineId !== null && lineId !== undefined)
    .join(',');
}

export function formatLost112Content(content: string): string {
  return content
    .replace(/하였습니다. /g, '하였습니다.\n\n')
    .replace(/바랍니다. /g, '바랍니다.\n\n');
}

export function formatSubwayArrivalTime(
  seconds: number,
  options: FormatSubwayArrivalTimeOptions = {},
): string {
  const {
    arrivalThresholdSeconds = 90,
    arrivalText = '진입',
    invalidText = '알 수 없음',
  } = options;

  if (!Number.isFinite(seconds) || seconds < 0) {
    return invalidText;
  }

  if (seconds <= arrivalThresholdSeconds) {
    return arrivalText;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}분`;
  }

  return `${minutes}분 ${remainingSeconds}초`;
}
