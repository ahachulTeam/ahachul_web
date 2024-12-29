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
import {
  useDeleteLostFoundArticle,
  useUpdateLostGoundStatus,
} from 'pages/lost-found/api/post-article';
import { queryClient } from 'app/lib/react-query';
import { getQueryKeys } from 'shared/api';
import { LOST_FOUND_QUERY_KEY } from 'pages/lost-found/api/query-key';
import { useGetLostFoundDetail } from 'pages/lost-found/api/get-detail';

export const ArticleDropEllipsis = ({
  articleId,
  isMyArticle,
}: WithArticleId & { isMyArticle: boolean }) => {
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

  const { pop, push } = useFlow();
  const handleEdit = () => {
    handleClose();
    pop();
    setTimeout(() => {
      push('EditLostArticle', { articleId });
    }, 500);
  };

  const content = useMemo(() => {
    switch (view) {
      case 'default':
        return isMyArticle ? (
          <DefaultView setView={setView} handleEdit={handleEdit} />
        ) : (
          <ReportView setView={setView} />
        );
      case 'remove':
        return isMyArticle ? (
          <RemoveArticle
            articleId={articleId}
            setView={setView}
            handleClose={handleClose}
          />
        ) : (
          <ReportDetalView setView={setView} />
        );
      case 'updateStatus':
        return (
          <UpdateStatus
            articleId={articleId}
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
  articleId,
  setView,
  handleClose,
}: {
  articleId: number;
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  const { data: article } = useGetLostFoundDetail(articleId, {
    suspense: false,
  });
  const {
    mutate: updateStatus,
    status,
    isPending,
  } = useUpdateLostGoundStatus();
  const handleUpdateArticleStatus = useCallback(
    () =>
      updateStatus(
        { postId: articleId, status: article.status },
        {
          onSuccess: () => {
            setTimeout(() => {
              handleClose();
            }, 350);
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).detail(articleId),
              });
            }, 550);
          },
        },
      ),
    [articleId],
  );

  return (
    <>
      <div>
        <Header
          icon={<RecoveryPhraseIcon />}
          title="상태 변경"
          description={
            article?.status === 'PROGRESS'
              ? '물건을 찾으셨나요? 확인 버튼을 클릭하면 찾기 완료 게시글로 업데이트돼요.'
              : '다시 물건을 찾고 있는 상태로 변경할까요?'
          }
        />
        {article?.status === 'PROGRESS' && (
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
        )}
      </div>
      <S.ButtonGroup>
        <S.SecondaryButton
          disabled={isPending}
          onClick={() => setView('default')}
          variant="default"
        >
          취소
        </S.SecondaryButton>
        <S.SmoothSecondaryButton
          status={status}
          idleText={
            <>
              <FaceIDIcon />
              <span css={{ marginLeft: '15px' }}>확인</span>
            </>
          }
          successText="변경 완료"
          css={{ backgroundColor: '#4DAFFF' }}
          handleClick={handleUpdateArticleStatus}
        />
      </S.ButtonGroup>
    </>
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
          }, 350);
          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: getQueryKeys(LOST_FOUND_QUERY_KEY).detail(articleId),
            });
          }, 550);
        },
      }),
    [articleId],
  );

  return (
    <>
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
    </>
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
        <S.Button onClick={() => setView('updateStatus')}>
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

function ReportView({ setView }: { setView: (view: string) => void }) {
  return (
    <>
      <S.DefaultViewHeader>
        <S.DefaultViewTitle>설정</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
        <S.DangerButton onClick={() => setView('remove')}>
          <WarningIcon />
          신고하기
        </S.DangerButton>
      </S.ButtonContainer>
    </>
  );
}

function ReportDetalView({ setView }: { setView: (view: string) => void }) {
  return (
    <>
      <Header
        icon={<DangerIcon />}
        title="글을 신고하시겠어요?"
        description="신고하면 고객센터에서 해달 글을 검토해요. 해당 글을 신고할까요?"
      />
      <S.ButtonGroup>
        <S.SecondaryButton
          variant="default"
          // disabled={isPending}
          onClick={() => setView('default')}
        >
          취소
        </S.SecondaryButton>
        <S.SecondaryButton onClick={() => setView('default')} variant="danger">
          확안
        </S.SecondaryButton>
      </S.ButtonGroup>
    </>
  );
}

const DrawerButton = styled.button`
  background-color: #141517;
  font-weight: 500;
  color: black;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.5);
  }
  transform: rotate(90deg);

  & > #EllipsisIcon {
    position: relative;
    top: -1px;
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
