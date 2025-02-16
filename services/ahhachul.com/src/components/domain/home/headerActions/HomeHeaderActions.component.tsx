import { useMemo, useReducer, useCallback, useRef } from 'react';

import { motion } from 'motion/react';
import { from, tap, map } from 'rxjs';

import { ChevronIcon } from '@/assets/icons/system';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useUserStationStore } from '@/stores/subway';
import type { UserStation } from '@/types';

import * as S from './HomeHeaderActions.styled';

const wrapperVariants = {
  open: {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0,
      stiffness: 300,
      damping: 24,
      when: 'beforeChildren',
      staggerChildren: 0.02,
      duration: 0.15,
    },
  },
  closed: {
    scaleX: 0.7,
    scaleY: 0.7,
    opacity: 0,

    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.2,
      staggerChildren: 0.3,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0, transition: { duration: 0 } },
};

const Option = ({ station, onClick }: { station: UserStation; onClick: () => void }) => {
  return (
    <li css={S.option} onClick={onClick}>
      <span>{station.name}</span>
    </li>
  );
};

const HomeHeaderActions = () => {
  const [openDialog, toggleDialog] = useReducer(open => !open, false);

  const dialogRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dialogRef, () => {
    if (!openDialog) return;
    toggleDialog();
  });

  const { stations, setUserStations } = useUserStationStore(state => state);
  const activatedStation = useMemo(() => stations[0], [stations]);

  const handleStationClick = useCallback(
    (clickedStation: UserStation) => () => {
      if (!openDialog) return;
      if (activatedStation.name === clickedStation.name) {
        toggleDialog();
        return;
      }

      from([clickedStation])
        .pipe(
          tap(() => toggleDialog()),
          map(clicked => [clicked, ...stations.filter(station => station.name !== clicked.name)]),
          tap(updatedStations => setUserStations(updatedStations)),
        )
        .subscribe();
    },
    [activatedStation.name, openDialog, stations, setUserStations],
  );

  return (
    <div css={S.container} ref={dialogRef}>
      <button css={S.button} onClick={toggleDialog}>
        <span>{activatedStation.name}</span>
        <motion.span variants={iconVariants}>
          <ChevronIcon />
        </motion.span>
      </button>
      <motion.div
        animate={openDialog ? 'open' : 'closed'}
        css={{
          position: 'relative',
        }}
      >
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{
            originY: 'top',
          }}
          css={S.menu}
        >
          {stations.map(station => (
            <Option key={station.name} station={station} onClick={handleStationClick(station)} />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default HomeHeaderActions;
