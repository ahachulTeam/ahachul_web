import { useActivity } from '@stackflow/react';

import { ShareIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useNativeBridge } from '@/contexts';
import { lostFoundKeys } from '@/services/lostFound';
import type { LostStatus } from '@/types';
import { getSharePageURL } from '@/utils/share';

import * as S from './LostFoundHeaderActions.styled';

interface LostFoundHeaderActionsProps {
  id: number;
  status: LostStatus;
  createdBy: number;
}

const LostFoundHeaderActions = ({ id, status, createdBy }: LostFoundHeaderActionsProps) => {
  const { params, isActive } = useActivity();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const handleClickShare = () => {
    if (!isBridgeInitialized) return;

    const targetUrl = getSharePageURL('LostFoundDetailPage');
    bridge.send.share(`${targetUrl}/${id}`);
  };

  if (!isActive) return null;

  return (
    <UiComponent.AnimatePortal mounted={isActive}>
      <div key="header-actions">
        <S.Container>
          <S.ActionButton type="button" onClick={handleClickShare}>
            <ShareIcon />
          </S.ActionButton>
          <UiComponent.PostDropEllipsis
            isLost
            status={status}
            articleId={params.id!}
            createdBy={createdBy}
            queryKey={lostFoundKeys.detail(id)}
          />
        </S.Container>
      </div>
    </UiComponent.AnimatePortal>
  );
};

export default LostFoundHeaderActions;
