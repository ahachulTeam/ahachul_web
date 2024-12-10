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

function Phrase({ setView }: { setView: (view: string) => void }) {
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
        <S.SecondaryButton onClick={() => setView('default')} variant="primary">
          <FaceIDIcon />
          확인
        </S.SecondaryButton>
      </S.ButtonGroup>
    </div>
  );
}

function Key({ setView }: { setView: (view: string) => void }) {
  return (
    <div>
      <div>
        <Header
          icon={<RecoveryPhraseIcon />}
          title="Private Key"
          description="Your Private Key is the key used to back up your wallet. Keep it secret and secure at all times."
        />
        <S.List>
          <S.ListItem>
            <ShieldIcon />
            Keep your private key safe
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
        <S.SecondaryButton onClick={() => setView('default')} variant="primary">
          <FaceIDIcon />
          확인
        </S.SecondaryButton>
      </S.ButtonGroup>
    </div>
  );
}

function RemoveArticle({ setView }: { setView: (view: string) => void }) {
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
          <S.SecondaryButton
            onClick={() => setView('default')}
            variant="danger"
          >
            확인
          </S.SecondaryButton>
        </S.ButtonGroup>
      </div>
    </div>
  );
}

function DefaultView({ setView }: { setView: (view: string) => void }) {
  return (
    <>
      <S.DefaultViewHeader>
        <S.DefaultViewTitle>Options</S.DefaultViewTitle>
      </S.DefaultViewHeader>
      <S.ButtonContainer>
        <S.Button onClick={() => setView('key')}>
          <LockIcon />
          상태 변경하기
        </S.Button>
        <S.Button onClick={() => setView('update')}>
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
