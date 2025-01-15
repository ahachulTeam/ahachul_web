import React from 'react';

import type { UserStation } from 'entities/@use-subway-context/model';
import type { IUserStationStore } from 'entities/@use-subway-context/slice';

import * as styles from './TrainLineFilter.css';

import { subwayLineToKrMap } from '../lib/subway-line-to-kr';

interface SubwayLineFilterProps extends IUserStationStore {
  activatedStation: UserStation;
}

export const TrainLineFilter = ({
  stations,
  activatedStation,
  setUserStations,
}: SubwayLineFilterProps) => {
  const reorderStationInfos = (parentLineId: number) => () => {
    // 클릭한 parentLineId에 해당하는 stationInfo 찾기
    const clickedInfo = activatedStation.stationInfos.find(
      info => info.parentLineId === parentLineId,
    );
    const remainingInfos = activatedStation.stationInfos.filter(
      info => info.parentLineId !== parentLineId,
    );

    // 클릭한 정보가 맨 앞으로 오도록 배열을 재구성
    const reorderedStationInfos = [clickedInfo, ...remainingInfos];

    // 업데이트된 station 객체
    const updatedStation = {
      ...activatedStation,
      stationInfos: reorderedStationInfos,
    };

    // 전체 stations 배열에서 해당 station 업데이트
    const updatedStations = stations.map(s =>
      s.name === activatedStation.name ? updatedStation : s,
    );

    // 상태 업데이트
    setUserStations(updatedStations);
  };

  return (
    <ul css={styles.filters}>
      {activatedStation.stationInfos.map(info => (
        <React.Fragment key={info.parentLineId}>
          <li css={styles.inherit(info.parentLineId)}>
            <button type="button" onClick={reorderStationInfos(info.parentLineId)}>
              {info.parentLineId > 9
                ? subwayLineToKrMap[info.parentLineId].replace('선', '')
                : info.parentLineId}
            </button>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};
