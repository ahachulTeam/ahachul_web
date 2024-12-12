import React, { useMemo, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFlow } from 'app/stackflow';
import useMeasure from 'react-use-measure';
import { Drawer } from 'vaul';
import styled from '@emotion/styled';

import { EllipsisIcon } from 'shared/static/icons/ellipsis';
import * as S from './ArticleDropEllipsis.css';
import {
  BannedIcon,
  CloseIcon,
  DangerIcon,
  FaceIDIcon,
  LockIcon,
  PassIcon,
  PhraseIcon,
  RecoveryPhraseIcon,
  ShieldIcon,
  WarningIcon,
} from 'shared/ui/FamilyDrawer/icons';
import { WithArticleId } from '../model';
import { useDeleteLostFoundArticle } from 'pages/lost-found/api/post-article';
import { queryClient } from 'app/lib/react-query';
import { getQueryKeys } from 'shared/api';
import { LOST_FOUND_QUERY_KEY } from 'pages/lost-found/api/query-key';

export const ArticleDropEllipsis = ({ articleId }: WithArticleId) => {
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
    push('Home', {});
  };

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return <DefaultView setView={setView} handleEdit={handleEdit} />;
      case 'remove':
        return (
          <RemoveArticle
            articleId={articleId}
            setView={setView}
            handleClose={handleClose}
          />
        );
      case 'key':
        return <UpdateStatus setView={setView} handleClose={handleClose} />;
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
    <>
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
    </>
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

function UpdateStatus({
  setView,
  handleClose,
}: {
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  return (
    <div>
      <div>
        <Header
          icon={<RecoveryPhraseIcon />}
          title="상태 변경"
          description="물건을 찾으셨나요? 확인 버튼을 클릭하면 해결 완료 게시글로 업데이트돼요."
        />
        <S.List>
          <S.ListItem>
            <ShieldIcon />
            민감한 개인정보를 노출하지 마세요
          </S.ListItem>
          <S.ListItem>
            <PassIcon />
            공개적인 글에 핸드폰 번호는 남기면 안돼요
          </S.ListItem>
          <S.ListItem>
            <BannedIcon />
            도용 신고는 고객센터를 통해 문의해요
          </S.ListItem>
        </S.List>
      </div>
      <S.ButtonGroup>
        <S.SecondaryButton onClick={() => setView('default')} variant="default">
          취소
        </S.SecondaryButton>
        <S.SecondaryButton onClick={handleClose} variant="primary">
          <FaceIDIcon />
          확인
        </S.SecondaryButton>
      </S.ButtonGroup>
    </div>
  );
}

function RemoveArticle({
  articleId,
  setView,
  handleClose,
}: {
  articleId: number;
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  const {
    mutate: deleteArticle,
    status,
    isPending,
  } = useDeleteLostFoundArticle();
  const handleDeleteArticle = useCallback(
    () =>
      deleteArticle(articleId, {
        onSuccess: () => {
          setTimeout(() => {
            handleClose();
          }, 850);
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).detail(articleId),
            });
          }, 1150);
        },
      }),
    [articleId],
  );

  return (
    <div>
      <div>
        <Header
          icon={<DangerIcon />}
          title="글을 삭제하시겠어요?"
          description="삭제하시면 복구할 수 없어요. 해당 글을 삭제할까요?"
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
            handleClick={handleDeleteArticle}
          />
        </S.ButtonGroup>
      </div>
    </div>
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
        <S.Button onClick={() => setView('key')}>
          <LockIcon />
          상태 변경하기
        </S.Button>
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
  max-width: 361px;
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
