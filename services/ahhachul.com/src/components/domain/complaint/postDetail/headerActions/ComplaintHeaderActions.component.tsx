import { useActivity } from '@stackflow/react';

import { ShareIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useNativeBridge } from '@/contexts';
import { complaintKeys } from '@/services/complaint';
import { getSharePageURL } from '@/utils/share';

import * as S from './ComplaintHeaderActions.styled';

interface ComplaintHeaderActionsProps {
  id: number;
  createdBy: number;
}

const ComplaintHeaderActions = ({ id, createdBy }: ComplaintHeaderActionsProps) => {
  const { params, isActive } = useActivity();
  const { bridge, isBridgeInitialized } = useNativeBridge();

  const handleClickShare = () => {
    if (!isBridgeInitialized) return;

    const targetUrl = getSharePageURL('ComplaintDetailPage');
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
            queryKey={complaintKeys.detail(id)}
          />
        </S.Container>
      </div>
    </UiComponent.AnimatePortal>
  );
};

export default ComplaintHeaderActions;
