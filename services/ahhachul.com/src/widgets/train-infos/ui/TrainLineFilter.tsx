import React from 'react';
import { WithSubwayStationId } from 'features/subway-stations';
import * as styles from './TrainLineFilter.css';

interface SubwayLineFilterProps extends WithSubwayStationId {}

export const TrainLineFilter = ({ stationId }: SubwayLineFilterProps) => {
  // const subwayLines = subwayMap[stationId];
  const subwayLines = [stationId];

  return (
    <div css={styles.filters}>
      <ul>
        {subwayLines.map((line, idx) => (
          <>
            {idx === 0 ? (
              <li key={'0'} css={styles.colorful}>
                {line}
              </li>
            ) : (
              <li key={`${line}-${idx}`} css={styles.inherit(line)}>
                <button type="button">{line}</button>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};
