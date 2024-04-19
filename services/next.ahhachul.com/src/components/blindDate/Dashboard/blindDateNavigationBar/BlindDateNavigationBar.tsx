import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { itemWrap, wrap } from './style';
import { blindDateNavbarMotionVariants } from '@/src/data/motion';
import IconBlind from '@/src/static/icons/blindDate/IconBlind';
import IconParty from '@/src/static/icons/blindDate/IconParty';
import { BlindDateViewType, IconType } from '@/src/types';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/stores';
import { setBlindDateView } from '@/src/stores/blindDate';

const BLIND_DATE_NAVBAR_LIST = [
  {
    Icon: IconBlind,
    label: 'BLIND',
  },
  {
    Icon: IconParty,
    label: 'PARTY',
  },
] as const;

interface BottomNavbarProps {
  scrollToTop: VoidFunction;
}

interface TabItemProps {
  label: BlindDateViewType;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const BlindDateNavigationBar = ({ scrollToTop }: BottomNavbarProps) => {
  const { showNavbar } = useAppSelector((state) => state.blindDate);

  return (
    <AnimatePresence mode="wait">
      {showNavbar && (
        <motion.nav css={wrap} variants={blindDateNavbarMotionVariants} initial="initial" animate="animate" exit="exit">
          {BLIND_DATE_NAVBAR_LIST.map((item, index) => {
            return <TabItem key={index} label={item.label} Icon={item.Icon} scrollToTop={scrollToTop} />;
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const TabItem: React.FC<TabItemProps> = ({ label, Icon, scrollToTop }) => {
  const dispatch = useDispatch();
  const { activeView } = useAppSelector((state) => state.blindDate);
  const handleTabClick = (label: BlindDateViewType) => () => {
    const isActive = activeView === label;
    if (isActive) scrollToTop();
    else dispatch(setBlindDateView(label));
  };

  return (
    <div css={itemWrap(activeView === label)}>
      <button onClick={handleTabClick(label)}>
        <Icon />
        <span>{label}</span>
      </button>
    </div>
  );
};

export default BlindDateNavigationBar;
