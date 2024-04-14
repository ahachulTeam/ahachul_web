import React, { memo, useCallback, useEffect } from 'react';
import IconListView from '@/src/static/icons/complaints/IconListView';
import IconSubmissionView from '@/src/static/icons/complaints/IconSubmissionView';
import IconCirclePlus from '@/src/static/icons/system/IconCirclePlus';
import { IconType } from '@/src/types';
import { itemWrap, plusBtn, complaintToggle } from './style';
import { useRouter, usePathname } from 'next/navigation';
import { PATH } from '@/src/data';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/src/stores';
import { setView } from '@/src/stores/complaints';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';

interface TabItemProps {
  href: string;
  label: string;
  Icon: IconType;
  scrollToTop: VoidFunction;
}

const TabItem: React.FC<TabItemProps> = ({ href, Icon, label, scrollToTop }) => {
  const { push, prefetch } = useRouter();
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

  useEffect(() => {
    prefetch(PATH.complaints, { kind: PrefetchKind.FULL });
    prefetch(PATH.lost, { kind: PrefetchKind.FULL });
    prefetch(PATH.community, { kind: PrefetchKind.FULL });
  }, []);

  return (
    <div css={itemWrap(isActive)}>
      <button onClick={handleTabClick}>
        <Icon />
        <span>{label}</span>
      </button>
      {isActive && href !== PATH.home && (pathname?.includes(PATH.lost) || pathname?.includes(PATH.community)) && (
        <GoToEditorButton routeToEditor={routeToEditor} />
      )}
      {isActive && pathname?.includes(PATH.complaints) && <ComplaintViewToggle />}
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
