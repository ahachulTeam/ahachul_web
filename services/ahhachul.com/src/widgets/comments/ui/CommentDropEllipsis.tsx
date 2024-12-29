import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';
import { useFlow } from 'app/stackflow';
import { Drawer } from 'vaul';
import styled from '@emotion/styled';

import { useDeleteComment } from 'pages/lost-found/api/post-comment';
import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import {
  CloseIcon,
  DangerIcon,
  PhraseIcon,
  WarningIcon,
} from 'shared/ui/FamilyDrawer/icons';
import * as S from './CommentDropEllipsis.css';
import { queryClient } from 'app/lib/react-query';
import { getQueryKeys } from 'shared/api';
import { LOST_FOUND_QUERY_KEY } from 'pages/lost-found/api/query-key';

export interface CommentDropEllipsisProps {
  articleId: string;
  commentId: number;
}

export const CommentDropEllipsis = ({
  articleId,
  commentId,
}: CommentDropEllipsisProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('default');
  const [elementRef, bounds] = useMeasure();
  const previousHeightRef = useRef<number>(0);

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
    setTimeout(() => {
      push('CommentInner', {
        commentId,
        articleId: +articleId,
        from: 'LostFoundDetail',
        mode: 'edit',
      });
    }, 500);
  };

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return <DefaultView setView={setView} handleEdit={handleEdit} />;
      case 'remove':
        return (
          <RemoveComment
            articleId={articleId}
            commentId={commentId}
            setView={setView}
            handleClose={handleClose}
          />
        );
    }
  }, [view]);

  const opacityDuration = useMemo(() => {
    const MIN_DURATION = 0.15;
    const MAX_DURATION = 0.27;

    if (!previousHeightRef.current) {
      previousHeightRef.current = bounds.height;
      return MIN_DURATION;
    }

    const heightDifference = Math.abs(
      bounds.height - previousHeightRef.current,
    );
    previousHeightRef.current = bounds.height;

    const duration = Math.min(
      Math.max(heightDifference / 500, MIN_DURATION),
      MAX_DURATION,
    );

    return duration;
  }, [bounds.height]);

  return (
    <div css={S.buttonFilter}>
      <DrawerButton onClick={handleOpen}>
        <EllipsisIcon />
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
  setView,
  handleEdit,
}: {
  setView: (view: string) => void;
  handleEdit: () => void;
}) {
  return (
    <>
      <S.DefaultViewHeader>
        <S.DefaultViewTitle>설정</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
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

function RemoveComment({
  articleId,
  commentId,
  setView,
  handleClose,
}: {
  articleId: string;
  commentId: number;
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  const {
    mutate: deleteComment,
    status,
    isPending,
  } = useDeleteComment(+articleId);
  const handleDeleteComment = useCallback(
    () =>
      deleteComment(commentId, {
        onSuccess: () => {
          setTimeout(() => {
            handleClose();
          }, 350);
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).comments(articleId),
            });
          }, 550);
        },
      }),
    [articleId, commentId],
  );

  return (
    <div>
      <div>
        <Header
          icon={<DangerIcon />}
          title="댓글을 삭제하시겠어요?"
          description="삭제하시면 복구할 수 없어요. 해당 댓글을 삭제할까요?"
        />
        <S.ButtonGroup>
          <S.SecondaryButton
            variant="default"
            disabled={isPending}
            onClick={() => setView('default')}
          >
            취소
          </S.SecondaryButton>
          <S.SmoothSecondaryButton
            status={status}
            handleClick={handleDeleteComment}
          />
        </S.ButtonGroup>
      </div>
    </div>
  );
}

const DrawerButton = styled.button`
  height: 24px;
  background-color: #141517;
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
  background-color: #222226f3;
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
  background-color: #f7f8f9;
  color: #949595;
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
