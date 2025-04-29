import React from 'react';

import { subwayLineOptions } from '@/constants';
import { StackFlow } from '@/stackflow';
import type { IUserStationStore } from '@/stores/subway';
import type { UserStation } from '@/types';

import * as S from './SubwayLineFilter.styled';

interface SubwayLineFilterProps extends IUserStationStore {
  currentStation: UserStation;
}

const SubwayLineFilter = ({
  userStations,
  currentStation,
  setUserStations,
}: SubwayLineFilterProps) => {
  const reorderStationInfos = (subwayLineId: number) => () => {
    const clickedInfo = currentStation.subwayLineInfoList.find(
      info => info.subwayLineId === subwayLineId,
    );
    const remainingInfos = currentStation.subwayLineInfoList.filter(
      info => info.subwayLineId !== subwayLineId,
    );

    const reorderedStationInfos = [clickedInfo, ...remainingInfos];

    const updatedStation = {
      ...currentStation,
      subwayLineInfoList: reorderedStationInfos,
    };

    const updatedStations = userStations.map(s =>
      s.stationName === currentStation.stationName ? updatedStation : s,
    ) as UserStation[];

    setUserStations(updatedStations);
  };

  return (
    <div css={S.container}>
      <ul css={S.filters}>
        {currentStation.subwayLineInfoList.map(info => (
          <React.Fragment key={info.subwayLineId}>
            <li css={S.inherit(info.subwayLineId)} onClick={reorderStationInfos(info.subwayLineId)}>
              <button
                type="button"
                css={S.filterBtn(
                  subwayLineOptions[
                    info.subwayLineId as unknown as keyof typeof subwayLineOptions
                  ].replace('선', '').length,
                )}
              >
                {info.subwayLineId > 9
                  ? subwayLineOptions[
                      info.subwayLineId as unknown as keyof typeof subwayLineOptions
                    ].replace('선', '')
                  : info.subwayLineId}
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
      <StackFlow.Link activityName="SubwayMapPage" activityParams={{}} css={S.link}>
        <span>전체 노선도 보기</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8L14 12L10 16" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </StackFlow.Link>
    </div>
  );
};

export default SubwayLineFilter;
