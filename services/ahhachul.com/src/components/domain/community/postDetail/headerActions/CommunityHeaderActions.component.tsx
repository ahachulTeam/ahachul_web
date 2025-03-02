import { useActivity } from '@stackflow/react';

import { ShareIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useNativeBridge } from '@/contexts';
import { communityKeys } from '@/services/community';
import { getSharePageURL } from '@/utils/share';

import * as S from './CommunityHeaderActions.styled';

interface CommunityHeaderActionsProps {
  id: number;
  createdBy: number;
}

const CommunityHeaderActions = ({ id, createdBy }: CommunityHeaderActionsProps) => {
  const { params, isActive } = useActivity();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const handleClickShare = () => {
    if (!isBridgeInitialized) return;

    const targetUrl = getSharePageURL('CommunityDetailPage');
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
            articleId={params.id!}
            createdBy={createdBy}
            queryKey={communityKeys.detail(id)}
          />
        </S.Container>
      </div>
    </UiComponent.AnimatePortal>
  );
};

export default CommunityHeaderActions;
