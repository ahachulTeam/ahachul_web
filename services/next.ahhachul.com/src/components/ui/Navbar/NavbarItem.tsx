import React from 'react';
import { useDispatch } from 'react-redux';
// import { TypeActivities, useFlow } from 'stackflow';
import IconListView from '@/src/static/icons/complaints/IconListView';
import IconSubmissionView from '@/src/static/icons/complaints/IconSubmissionView';
import IconCirclePlus from '@/src/static/icons/system/IconCirclePlus';
import { useAppSelector } from '@/src/stores';
// import { setView } from '@/src/stores/complaints';
import { IconType } from '@/src/types';
import { KeyOf } from '@/src/types/utility-types/KeyOf';
import { itemWrap, plusBtn, complaintToggle } from './style';

interface TabItemProps {
  activeTab: KeyOf<any>;
  href: KeyOf<any>;
  label: string;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ activeTab, href, Icon, label, scrollToTop }) => {
  // const { push, replace } = useFlow();
  const isActive = activeTab === href;
  const handleTabClick = () => {
    if (isActive) scrollToTop();
    // else replace(href, {}, { animate: false });
  };
  const routeToEditor = () => {
    // if (activeTab === 'Lost') push('LostEditor', {});
    // else push('CommunityEditor', {});
  };

  return (
    <div css={itemWrap(activeTab === href)}>
      <button onClick={handleTabClick}>
        <Icon />
        <span>{label}</span>
      </button>
      {isActive && (activeTab === 'Lost' || activeTab === 'Community') && (
        <button css={plusBtn} onClick={routeToEditor}>
          <IconCirclePlus />
        </button>
      )}
      {isActive && activeTab === 'Complaints' && <ComplaintViewToggle />}
    </div>
  );
};

const ComplaintViewToggle = () => {
  const dispatch = useDispatch();
  // const { activeView } = useAppSelector((state) => state.complaint);
  const handleToggle = () => {
    // dispatch(setView(activeView === 'SUBMISSION' ? 'LIST' : 'SUBMISSION'));
  };

  return (
    <button css={complaintToggle} onClick={handleToggle}>
      {/* {activeView === 'SUBMISSION' ? <IconListView /> : <IconSubmissionView />} */}
    </button>
  );
};

export default TabItem;
