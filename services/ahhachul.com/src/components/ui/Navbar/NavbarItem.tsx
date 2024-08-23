import React from 'react';
import { useDispatch } from 'react-redux';
import { TypeActivities, useFlow } from 'stackflow';
import IconListView from 'shared/static/icons/complaints/IconListView';
import IconSubmissionView from 'shared/static/icons/complaints/IconSubmissionView';
import IconCirclePlus from 'shared/static/icons/system/IconCirclePlus';
import { useAppSelector } from 'stores';
import { setView } from 'stores/complaints';
import { IconType } from 'types';
import { KeyOf } from 'types/utility-types/KeyOf';
import { itemWrap, plusBtn, complaintToggle } from './style';

interface TabItemProps {
  activeTab: KeyOf<TypeActivities>;
  href: KeyOf<TypeActivities>;
  label: string;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ activeTab, href, Icon, label, scrollToTop }) => {
  const { push, replace } = useFlow();
  const isActive = activeTab === href;
  const handleTabClick = () => {
    if (isActive) scrollToTop();
    else replace(href, {}, { animate: false });
  };
  const routeToEditor = () => {
    if (activeTab === 'Lost') push('LostEditor', {});
    else push('CommunityEditor', {});
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
