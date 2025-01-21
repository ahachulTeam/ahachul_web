import { useReducer } from 'react';

import { useActivity } from '@stackflow/react';

import { MoreVerticalIcon, ShareIcon } from '@/assets/icons/system';
import { UiComponent } from '@/components';
import { useUser } from '@/hooks/domain';
import { useFlow } from '@/stackflow';

import * as S from './CommunityHeaderActions.styled';

interface CommunityHeaderActionsProps {
  id: number;
  createdBy: number;
}

const CommunityHeaderActions = ({ id, createdBy }: CommunityHeaderActionsProps) => {
  const { push } = useFlow();
  const { isActive } = useActivity();

  const { user } = useUser();

  const [isOpen, toggle] = useReducer(open => !open, false);

  const isAuthor = user?.memberId === createdBy;

  const actions = isAuthor
    ? [
        {
          label: '수정하기',
          onClick: () => push('EditLostFoundPage', { id }),
        },
        {
          label: '삭제하기',
          onClick: () => console.log('삭제하기'),
        },
      ]
    : [
        {
          label: '신고하기',
          onClick: () => console.log('신고하기'),
        },
      ];

  if (!isActive) return null;

  return (
    <>
      <UiComponent.AnimatePortal mounted={isActive}>
        <div key="header-actions">
          <S.Container>
            <S.ActionButton type="button">
              <ShareIcon />
            </S.ActionButton>
            <S.ActionButton type="button" onClick={toggle}>
              <MoreVerticalIcon />
            </S.ActionButton>
          </S.Container>
        </div>
      </UiComponent.AnimatePortal>

      <UiComponent.AnimatePortal mounted={isOpen}>
        <div key="action-sheet">
          <UiComponent.ActionSheet isOpen={isOpen} onClose={toggle} actions={actions} />
        </div>
      </UiComponent.AnimatePortal>
    </>
  );
};

export default CommunityHeaderActions;
