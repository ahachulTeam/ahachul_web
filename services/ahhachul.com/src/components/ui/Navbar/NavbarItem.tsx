import React from 'react';
import { TypeActivities } from 'stackflow';
import IconCirclePlus from 'static/icons/system/IconCirclePlus';
import { IconType } from 'types';
import { KeyOf } from 'types/utility-types/KeyOf';
import { itemWrap, plusBtn } from './style';

interface TabItemProps {
  activeTab: KeyOf<TypeActivities>;
  href: KeyOf<TypeActivities>;
  label: string;
  Icon: IconType;
  push: (tab: KeyOf<TypeActivities>) => void;
  replace: (tab: KeyOf<TypeActivities>) => void;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ activeTab, href, Icon, label, push, replace, scrollToTop }) => {
  const isActive = activeTab === href;
  const handleTabClick = () => {
    if (isActive) scrollToTop();
    else replace(href);
  };
  const routeToEditor = () => {
    if (activeTab === 'Lost') push('LostEditor');
    else push('CommunityEditor');
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
    </div>
  );
};

export default TabItem;
