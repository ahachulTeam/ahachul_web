import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useMutation } from '@tanstack/react-query';

import { createMessage } from '@/apis/request';
import { LayoutComponent } from '@/components';
import { useActivity, useFlow } from '@/stackflow';
import { mixins, theme } from '@/styles';
import { resolveClientErrorMessage } from '@/utils/observability';

const TalkSettingPage: ActivityComponentType = () => {
  const activity = useActivity();
  const { pop, replace } = useFlow();
  const [targetMemberId, setTargetMemberId] = useState('');
  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const routeParamMemberId =
      typeof activity.params === 'object' && activity.params !== null
        ? (activity.params as { targetMemberId?: string }).targetMemberId
        : undefined;

    const queryParamMemberId =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('targetMemberId')
        : null;

    const initialMemberId = routeParamMemberId ?? queryParamMemberId ?? '';
    if (/^\d+$/.test(initialMemberId)) {
      setTargetMemberId(initialMemberId);
    }
  }, [activity.params]);

  const createMessageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: response => {
      replace('TalkDetailPage', { id: response.result.roomId });
    },
    onError: error => {
      setSubmitError(resolveClientErrorMessage(error, '새 대화 생성에 실패했습니다.'));
    },
  });

  const handleCreateConversation = () => {
    const receiverMemberId = Number(targetMemberId);
    const content = draft.trim();

    if (!Number.isInteger(receiverMemberId) || receiverMemberId <= 0) {
      setSubmitError('상대 memberId를 숫자로 입력해주세요.');
      return;
    }

    if (!content.length) {
      setSubmitError('첫 메시지를 입력해주세요.');
      return;
    }

    setSubmitError(null);
    createMessageMutation.mutate({
      receiverMemberId,
      content,
    });
  };

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.Title>새 대화 시작</S.Title>
          <S.Description>상대 memberId와 첫 메시지를 입력해 새 쪽지방을 시작합니다.</S.Description>
          <S.BackButton type="button" onClick={pop}>
            목록으로 돌아가기
          </S.BackButton>
        </S.HeaderCard>

        <S.FormCard>
          <S.FieldLabel htmlFor="receiverMemberId">상대 memberId</S.FieldLabel>
          <S.Input
            id="receiverMemberId"
            value={targetMemberId}
            onChange={event => setTargetMemberId(event.target.value)}
            placeholder="예: 25"
          />
          <S.FieldLabel htmlFor="firstMessage">첫 메시지</S.FieldLabel>
          <S.TextArea
            id="firstMessage"
            value={draft}
            onChange={event => setDraft(event.target.value)}
            placeholder="쪽지를 입력해주세요."
          />
          {submitError ? <S.ErrorText>{submitError}</S.ErrorText> : null}
          <S.SubmitButton
            type="button"
            onClick={handleCreateConversation}
            disabled={createMessageMutation.isPending}
          >
            {createMessageMutation.isPending ? '생성 중...' : '대화 시작'}
          </S.SubmitButton>
        </S.FormCard>
      </S.Container>
    </LayoutComponent.Base>
  );
};

const S = {
  Container: styled.section`
    ${mixins.flexColumn};
    ${mixins.fullWidth};
    ${mixins.sideGutter};
    ${mixins.pagePaddingTop};
    ${mixins.pagePaddingBottom};
    gap: 12px;
  `,
  HeaderCard: styled.article`
    ${mixins.flexColumn};
    gap: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 16px;
    background-color: ${theme.colors.white};
    padding: 16px;
  `,
  Title: styled.h1`
    ${theme.fonts.titleLarge};
    color: ${theme.colors.gray[90]};
  `,
  Description: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `,
  BackButton: styled.button`
    ${theme.fonts.labelSmall};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    width: fit-content;
    padding: 6px 10px;
  `,
  FormCard: styled.article`
    ${mixins.flexColumn};
    gap: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 16px;
    background-color: ${theme.colors.white};
    padding: 16px;
  `,
  FieldLabel: styled.label`
    ${theme.fonts.labelSmall};
    color: ${theme.colors.gray[80]};
  `,
  Input: styled.input`
    ${theme.fonts.bodyMedium};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    padding: 10px 12px;
  `,
  TextArea: styled.textarea`
    ${theme.fonts.bodyMedium};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    resize: none;
    min-height: 96px;
    padding: 10px 12px;
  `,
  SubmitButton: styled.button`
    ${theme.fonts.labelMedium};
    border-radius: 10px;
    color: ${theme.colors.white};
    background-color: ${theme.colors['key-color']};
    width: fit-content;
    margin-left: auto;
    padding: 10px 14px;

    &:disabled {
      opacity: 0.45;
    }
  `,
  ErrorText: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.red};
  `,
};

export default TalkSettingPage;
