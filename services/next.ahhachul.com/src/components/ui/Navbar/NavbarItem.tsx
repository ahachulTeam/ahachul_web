import React, { memo, useCallback } from 'react';
import IconListView from '@/src/static/icons/complaints/IconListView';
import IconSubmissionView from '@/src/static/icons/complaints/IconSubmissionView';
import IconCirclePlus from '@/src/static/icons/system/IconCirclePlus';
import { IconType } from '@/src/types';
import { itemWrap, plusBtn, complaintToggle } from './style';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { PATH } from '@/src/data';

interface TabItemProps {
  href: string;
  label: string;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ href, Icon, label, scrollToTop }) => {
  const { push, replace, query } = useRouter();
  const pathname = usePathname();
  const isActive = href === PATH.home ? pathname === PATH.home : pathname?.includes(href);

  const handleTabClick = () => {
    if (isActive) scrollToTop();
    else push(href);
  };

  const routeToEditor = useCallback(() => {
    if (href === PATH.lost) push(PATH.lostEditor);
    else push(PATH.communityEditor);
  }, [href, push]);

  const toggleComplaintView = useCallback(() => {
    if (query?.tab !== 'list') replace(`${PATH.complaints}?tab=list`);
    else replace(PATH.complaints);
  }, [href, replace]);

  return (
    <div css={itemWrap(isActive)}>
      <button onClick={handleTabClick}>
        <Icon />
        <span>{label}</span>
      </button>
      {isActive && href !== PATH.home && (pathname?.includes(PATH.lost) || pathname?.includes(PATH.community)) && (
        <GoToEditorButton routeToEditor={routeToEditor} />
      )}
      {isActive && pathname?.includes(PATH.complaints) && (
        <ComplaintViewToggle viewType={query?.tab as string | undefined} toggleComplaintView={toggleComplaintView} />
      )}
    </div>
  );
};

const GoToEditorButton = memo(({ routeToEditor }: { routeToEditor: VoidFunction }) => {
  return (
    <button css={plusBtn} onClick={routeToEditor}>
      <IconCirclePlus />
    </button>
  );
});

const ComplaintViewToggle = ({
  viewType,
  toggleComplaintView,
}: {
  viewType?: string;
  toggleComplaintView: VoidFunction;
}) => {
  return (
    <button css={complaintToggle} onClick={toggleComplaintView}>
      {viewType !== 'list' ? <IconListView /> : <IconSubmissionView />}
    </button>
  );
};

export default TabItem;
