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
      stiffness: 300,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.02,
      duration: 0.15,
    },
  },
  closed: {
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.5,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0, transition: { duration: 0 } },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0,
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0,
      when: 'afterChildren',
    },
  },
};

const actionTextVariants = {
  open: { scale: 1, y: 0, transition: { duration: 0.15 } },
  closed: { scale: 0, y: -7, transition: { duration: 0.15 } },
};

const Option = ({ station, onClick }: { station: UserStation; onClick: () => void }) => {
  return (
    <motion.li variants={itemVariants} css={S.option} onClick={onClick}>
      <motion.span variants={actionTextVariants}>{station.name}</motion.span>
    </motion.li>
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
