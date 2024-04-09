import React from 'react';
import IconListView from '@/src/static/icons/complaints/IconListView';
import IconSubmissionView from '@/src/static/icons/complaints/IconSubmissionView';
import IconCirclePlus from '@/src/static/icons/system/IconCirclePlus';
import { IconType } from '@/src/types';
import { itemWrap, plusBtn, complaintToggle } from './style';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { PATH } from '@/src/data';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/stores';
import { setView } from '@/src/stores/complaints';

interface TabItemProps {
  href: string;
  label: string;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ href, Icon, label, scrollToTop }) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleTabClick = () => {
    console.log('isActive', isActive);
    if (isActive) scrollToTop();
    else push(href);
  };

  const routeToEditor = () => {
    if (href === PATH.lost) push(PATH.lostEditor);
    else push(PATH.communityEditor);
  };

  return (
    <div css={itemWrap(pathname === href)}>
      <button onClick={handleTabClick}>
        <Icon />
        <span>{label}</span>
      </button>
      {isActive && (pathname === PATH.lost || pathname === PATH.community) && (
        <button css={plusBtn} onClick={routeToEditor}>
          <IconCirclePlus />
        </button>
      )}
      {isActive && pathname === PATH.complaints && <ComplaintViewToggle />}
    </div>
  );
};

const ComplaintViewToggle = () => {
  const dispatch = useDispatch();
  const { activeView } = useAppSelector((state) => state.complaint);
  const handleToggle = () => {
    dispatch(setView(activeView === 'SUBMISSION' ? 'LIST' : 'SUBMISSION'));
  };

  return (
    <button css={complaintToggle} onClick={handleToggle}>
      {activeView === 'SUBMISSION' ? <IconListView /> : <IconSubmissionView />}
    </button>
  );
};

export default TabItem;
