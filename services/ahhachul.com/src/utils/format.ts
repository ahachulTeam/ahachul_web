import {
  type Stations,
  type SubwayLineServerModel,
  type UserStationList,
  SubwayLineFilterOptions,
} from '@/types';

export const formatSubwayFilterOption = (
  lineFilter: SubwayLineFilterOptions,
  favoriteLines?: string,
) => {
  switch (lineFilter) {
    case SubwayLineFilterOptions.ALL_LINES:
      return 0;
    case SubwayLineFilterOptions.ONLY_MY_LINE:
      return favoriteLines;
  }
};

export const formatLost112Content = (content: string) => {
  const formattedText = content
    .replace(/하였습니다. /g, '하였습니다.\n\n')
    .replace(/바랍니다. /g, '바랍니다.\n\n');

  return formattedText;
};

export const formatSubwayLineInfo = (subwayResponse: SubwayLineServerModel) => {
  const possibleDuplicatedStations = subwayResponse?.subwayLines.reduce((acc, curr) => {
    curr?.stations?.forEach(station => {
      if (!acc[station?.name]) {
        acc[station?.name] = [
          {
            stationId: station?.id,
            parentLineId: curr?.id,
            parentLineNames: curr?.name,
          },
        ];
      } else {
        acc[station?.name] = [
          ...acc[station?.name],
          {
            stationId: station?.id,
            parentLineId: curr?.id,
            parentLineNames: curr?.name,
          },
        ];
      }
    });
    return acc;
  }, {} as Stations);
  return possibleDuplicatedStations;
};

export const getFirstParentLineId = (stations: UserStationList): string => {
  return stations[0]?.subwayLineInfoList?.map(station => station.subwayLineId)?.join(',');
};
