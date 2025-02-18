import React from 'react';

import { subwayLineOptions } from '@/constants';
import type { IUserStationStore } from '@/stores/subway';
import type { UserStation } from '@/types';

import * as S from './SubwayLineFilter.styled';

interface SubwayLineFilterProps extends IUserStationStore {
  activatedStation: UserStation;
}

const SubwayLineFilter = ({
  stations,
  activatedStation,
  setUserStations,
}: SubwayLineFilterProps) => {
  const reorderStationInfos = (parentLineId: number) => () => {
    const clickedInfo = activatedStation.stationInfos.find(
      info => info.parentLineId === parentLineId,
    );
    const remainingInfos = activatedStation.stationInfos.filter(
      info => info.parentLineId !== parentLineId,
    );

    const reorderedStationInfos = [clickedInfo, ...remainingInfos];

    const updatedStation = {
      ...activatedStation,
      stationInfos: reorderedStationInfos,
    };

    const updatedStations = stations.map(s =>
      s.name === activatedStation.name ? updatedStation : s,
    ) as UserStation[];

    setUserStations(updatedStations);
  };

  return (
    <ul css={S.filters}>
      {activatedStation.stationInfos.map(info => (
        <React.Fragment key={info.parentLineId}>
          <li css={S.inherit(info.parentLineId)} onClick={reorderStationInfos(info.parentLineId)}>
            <button type="button">
              {info.parentLineId > 9
                ? subwayLineOptions[
                    info.parentLineId as unknown as keyof typeof subwayLineOptions
                  ].replace('선', '')
                : info.parentLineId}
            </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default SubwayLineFilter;
