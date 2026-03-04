import { memo } from 'react';

import { motion } from 'motion/react';

import { RetryIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { getArrivalStatusText, isSubwayNeedAnimation, motions } from '@/constants';
import { fade } from '@/styles';
import { type CurrentTrainArrivalType, type UpDownType } from '@/types';

import * as S from './TrainRealTimes.styled';

import SubwayUpDownFilter from '../upDownFilter/UpDownFilter.component';

interface TrainArrivalStatusProps {
  sort: UpDownType;
  isError: boolean;
  isFetching: boolean;
  isServiceTerminated: boolean;
  destinationStationDirection?: string;
  currentTrainArrivalCode?: CurrentTrainArrivalType;
  onRefetch: () => void;
  handleSort: () => void;
}

const TrainArrivalStatus = memo(
  ({
    sort,
    isError,
    isFetching,
    isServiceTerminated,
    currentTrainArrivalCode,
    destinationStationDirection = '',
    onRefetch,
    handleSort,
  }: TrainArrivalStatusProps) => {
    return (
      <motion.div
        exit="exit"
        animate="animate"
        initial="initial"
        css={S.arrivalInfoLabel}
        variants={motions.fadeIn(0.3)}
      >
        <div css={{ display: 'flex', alignItems: 'center', height: '24px' }}>
          <b
            css={{
              animation: isSubwayNeedAnimation(currentTrainArrivalCode)
                ? `${fade} 2s infinite ease-in-out`
                : 'none',
            }}
          >
            {isFetching && <UiComponent.SpinnerIcon css={S.loading} />}
            {!isFetching &&
              getArrivalStatusText(isError, isServiceTerminated, currentTrainArrivalCode)}
          </b>
          <span>{isError || isFetching ? '' : destinationStationDirection}</span>
        </div>
        <div css={S.upDown}>
          <SubwayUpDownFilter sort={sort} handleSort={handleSort} />
          <div />
          <RefreshButton onRefresh={onRefetch} />
        </div>
      </motion.div>
    );
  },
);

interface RefreshButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
  return (
    <button css={S.refetchBtnCss} onClick={onRefresh} aria-label="새로고침">
      <RetryIcon />
    </button>
  );
};

TrainArrivalStatus.displayName = 'TrainArrivalStatus';

export default TrainArrivalStatus;
