import React, { useMemo, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';

import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
// import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';
import { Drawer } from 'vaul';

import { resolvePostListInvalidationKey, resolvePostQueryDomain } from '@ahhachul/domain';
import { sleep } from '@ahhachul/utils';

import {
  CloseIcon,
  DangerIcon,
  FaceIDIcon,
  LockIcon,
  PhraseIcon,
  WarningIcon,
} from '@/assets/icons/jsx/icons';
import { MoreVerticalIcon } from '@/assets/icons/system';
import { useUser } from '@/hooks/domain';
import useUpdateLostFound from '@/hooks/domain/lostFound/useUpdateLostFound';
import { useDeleteCommunity } from '@/services/community';
import { complaintKeys, useDeleteComplaint } from '@/services/complaint';
import { lostFoundKeys, useDeleteLostFound } from '@/services/lostFound';
import { useFlow } from '@/stackflow';
import { LostStatus } from '@/types';

import * as S from './PostDropEllipsis.styled';

export interface PostDropEllipsisProps {
  isLost?: boolean;
  status?: LostStatus;
  articleId: string;
  createdBy: number;
  queryKey: readonly unknown[];
}

function resolveEditActivityName(queryKey: readonly unknown[]) {
  const postDomain = resolvePostQueryDomain(queryKey);
  if (postDomain === 'community') {
    return 'EditCommunityPage';
  }

  if (postDomain === 'lost-found') {
    return 'EditLostFoundPage';
  }

  return 'EditComplaintPage';
}

const PostDropEllipsis = ({
  isLost,
  status,
  articleId,
  createdBy,
  queryKey,
}: PostDropEllipsisProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('default');
  const [elementRef, bounds] = useMeasure();
  const previousHeightRef = useRef<number>(0);

  const { user } = useUser();
  const isAuthor = user?.memberId === createdBy;

  const handleOpen = () => {
    setView('default');
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };
  const handleClose = () => setIsOpen(false);

  const { push } = useFlow();
  const handleEdit = () => {
    handleClose();
    const activityName = resolveEditActivityName(queryKey);

    setTimeout(() => {
      push(activityName, {
        id: +articleId,
      });
    }, 500);
  };

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return isAuthor ? (
          <DefaultView isLost={isLost} status={status} setView={setView} handleEdit={handleEdit} />
        ) : (
          <ReportView handleClose={handleClose} />
        );
      case 'remove':
        return (
          <RemovePost
            queryKey={queryKey}
            articleId={articleId}
            setView={setView}
            handleClose={handleClose}
          />
        );
      case 'update':
        return (
          <UpdatePost
            queryKey={queryKey}
            articleId={articleId}
            lostStatus={status}
            setView={setView}
            handleClose={handleClose}
          />
        );
    }
  }, [view, queryKey]);

  const opacityDuration = useMemo(() => {
    const MIN_DURATION = 0.15;
    const MAX_DURATION = 0.27;

    if (!previousHeightRef.current) {
      previousHeightRef.current = bounds.height;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(bounds.height - previousHeightRef.current);
    previousHeightRef.current = bounds.height;

    const duration = Math.min(Math.max(heightDifference / 500, MIN_DURATION), MAX_DURATION);

    return duration;
  }, [bounds.height]);

  return (
    <div css={S.buttonFilter}>
      <DrawerButton onClick={handleOpen}>
        <MoreVerticalIcon />
      </DrawerButton>
      <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
        <Drawer.Portal>
          <DrawerOverlay onClick={handleClose} />
          <Drawer.Content asChild>
            <DrawerContentWrapper
              animate={{
                height: bounds.height,
                transition: {
                  duration: 0.27,
                  ease: [0.25, 1, 0.5, 1],
                },
              }}
            >
              <Drawer.Close asChild>
                <CloseButton>
                  <CloseIcon />
                </CloseButton>
              </Drawer.Close>
              <ContentWrapper ref={elementRef}>
                <AnimatePresence initial={false} mode="popLayout" custom={view}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    key={view}
                    transition={{
                      duration: opacityDuration,
                      ease: [0.26, 0.08, 0.25, 1],
                    }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </ContentWrapper>
            </DrawerContentWrapper>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

function Header({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <S.HeaderWrapper>
      {icon}
      <S.HeaderTitle>{title}</S.HeaderTitle>
      <S.HeaderDescription>{description}</S.HeaderDescription>
    </S.HeaderWrapper>
  );
}

function DefaultView({
  isLost,
  status,
  setView,
  handleEdit,
}: {
  isLost?: boolean;
  status?: LostStatus;
  setView: (view: string) => void;
  handleEdit: () => void;
}) {
  return (
    <>
      <S.DefaultViewHeader>
        <S.DefaultViewTitle>설정</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
        {isLost && (
          <S.GreenButton onClick={() => setView('update')}>
            <Check size={21} color="var(--ah-color-legacy-text-success-alpha)" />
            {status === 'PROGRESS' ? '찾기 완료' : '상태 변경'}
          </S.GreenButton>
        )}
        <S.Button onClick={handleEdit}>
          <PhraseIcon />
          수정하기
        </S.Button>
        <S.DangerButton onClick={() => setView('remove')}>
          <WarningIcon />
          삭제하기
        </S.DangerButton>
      </S.ButtonContainer>
    </>
  );
}

function ReportView({ handleClose }: { handleClose: () => void }) {
  return (
    <>
      <S.DefaultViewHeader css={{ marginBottom: 0 }}>
        <S.DefaultViewTitle>설정</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
        <S.DangerButton onClick={handleClose}>
          <WarningIcon />
          신고하기
        </S.DangerButton>
      </S.ButtonContainer>
    </>
  );
}

function RemovePost({
  articleId,
  queryKey,
  setView,
  handleClose,
}: {
  articleId: string;
  queryKey: readonly unknown[];
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  const { pop } = useFlow();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCommunity, status: deletingCommunityStatus } = useDeleteCommunity();
  const { mutateAsync: deleteLostFound, status: deletingLostFoundStatus } = useDeleteLostFound();
  const { mutateAsync: deleteComplaint, status: deletingComplaintStatus } = useDeleteComplaint();

  const postDomain = resolvePostQueryDomain(queryKey);
  const invalidationQueryKey = resolvePostListInvalidationKey(queryKey) ?? complaintKeys.lists();
  let deleteMutate = deleteComplaint;
  let mutationStatus = deletingComplaintStatus;

  if (postDomain === 'community') {
    deleteMutate = deleteCommunity;
    mutationStatus = deletingCommunityStatus;
  } else if (postDomain === 'lost-found') {
    deleteMutate = deleteLostFound;
    mutationStatus = deletingLostFoundStatus;
  }

  const handleDeletePost = async () => {
    try {
      await deleteMutate(+articleId, {
        onSuccess: async () => {
          await sleep(350);
          handleClose();
          await sleep(200);
          await queryClient.invalidateQueries({ queryKey: invalidationQueryKey });
          pop();
        },
      });
    } catch (error) {
      console.error('게시물 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <div>
        <Header
          icon={<DangerIcon />}
          title="게시글을 삭제하시겠어요?"
          description={`삭제하시면 복구할 수 없어요.\n해당 게시글을 삭제할까요?`}
        />
        <S.ButtonGroup>
          <S.SecondaryButton
            variant="default"
            // disabled={isPending}
            onClick={() => setView('default')}
          >
            취소
          </S.SecondaryButton>
          <S.SmoothSecondaryButton status={mutationStatus} handleClick={handleDeletePost} />
        </S.ButtonGroup>
      </div>
    </div>
  );
}

function UpdatePost({
  articleId,
  lostStatus,
  setView,
  handleClose,
}: {
  articleId: string;
  queryKey: readonly unknown[];
  lostStatus?: LostStatus;
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync, status } = useUpdateLostFound();
  const handleUpdateLostStatus = () => {
    mutateAsync(
      {
        articleId: +articleId,
        status: lostStatus === 'COMPLETE' ? 'PROGRESS' : 'COMPLETE',
      },
      {
        onSuccess: () => {
          handleClose();
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: lostFoundKeys.detail(+articleId),
            });
          }, 1000);
        },
      },
    );
  };

  return (
    <div>
      <div>
        <Header
          icon={lostStatus === 'COMPLETE' ? <LockIcon /> : <FaceIDIcon />}
          title={lostStatus === 'COMPLETE' ? '찾음 상태를 취소하시겠어요?' : '분실물을 찾으셨나요?'}
          description={
            lostStatus === 'COMPLETE'
              ? `물건을 다시 분실 상태로 변경하시겠어요?\n게시글이 '찾지 못함' 상태로 돌아갑니다.`
              : `분실물을 찾으셨다면 알려주세요.\n게시글 상태가 '찾음'으로 변경됩니다.`
          }
        />
        <S.ButtonGroup>
          <S.SecondaryButton variant="default" onClick={() => setView('default')}>
            취소
          </S.SecondaryButton>
          <S.SmoothGreenButton status={status} handleClick={handleUpdateLostStatus} />
        </S.ButtonGroup>
      </div>
    </div>
  );
}

const DrawerButton = styled.button`
  height: 24px;
  font-weight: 500;
  color: black;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }
`;

const DrawerOverlay = styled(Drawer.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const DrawerContentWrapper = styled(motion.div)`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 10010;
  max-width: 360px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  border-radius: 36px;
  background-color: var(--ah-color-white);
  outline: none;
  transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 28px;
  right: 32px;
  z-index: 10;
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: var(--ah-color-legacy-surface-soft);
  color: var(--ah-color-legacy-text-dim);
  transition: transform 0.2s;
  &:focus {
    transform: scale(0.95);
  }
  &:active {
    transform: scale(0.75);
  }
`;

const ContentWrapper = styled.div`
  padding: 10px 24px 24px;
`;

export default PostDropEllipsis;
