import React from 'react';
import {
  BannedIcon,
  DangerIcon,
  FaceIDIcon,
  LockIcon,
  PassIcon,
  PhraseIcon,
  RecoveryPhraseIcon,
  ShieldIcon,
  WarningIcon,
} from './icons';
import * as S from './styles';

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

function Phrase({
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
          title="Secret Recovery Phrase"
          description="Your Secret Recovery Phrase is the key used to back up your wallet. Keep it secret at all times."
        />
        <S.List>
          <S.ListItem>
            <ShieldIcon />
            Keep your Secret Phrase safe
          </S.ListItem>
          <S.ListItem>
            <PassIcon />
            Don&apos;t share it with anyone else
          </S.ListItem>
          <S.ListItem>
            <BannedIcon />
            If you lose it, we can&apos;t recover it
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

function Key({
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
          title="게시글 상태 변경"
          description="물건을 찾으셨나요? 확인 버튼을 클릭하면 해결 완료 게시글로 업데이트돼요."
        />
        <S.List>
          <S.ListItem>
            <ShieldIcon />
            민갑함 개인정보를 노출하지 마세요
          </S.ListItem>
          <S.ListItem>
            <PassIcon />
            공개적인 글에 핸드폰 번호는 남기면 안돼요
          </S.ListItem>
          <S.ListItem>
            <BannedIcon />
            도용 방지 신고는 고객센터를 통해 문의해요
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
          icon={<DangerIcon />}
          title="글을 삭제하시겠어요?"
          description="삭제하시면 복구할 수 없어요. 해당 글을 삭제할까요?"
        />
        <S.ButtonGroup>
          <S.SecondaryButton
            onClick={() => setView('default')}
            variant="default"
          >
            취소
          </S.SecondaryButton>
          <S.SmoothSecondaryButton handleClick={handleClose} />
        </S.ButtonGroup>
      </div>
    </div>
  );
}

function DefaultView({
  setView,
  handleClose,
}: {
  setView: (view: string) => void;
  handleClose: () => void;
}) {
  return (
    <>
      <S.DefaultViewHeader>
        <S.DefaultViewTitle>게시글 설정</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
        <S.Button onClick={() => setView('key')}>
          <LockIcon />
          상태 변경하기
        </S.Button>
        <S.Button onClick={handleClose}>
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

export { DefaultView, Key, Phrase, RemoveArticle };
