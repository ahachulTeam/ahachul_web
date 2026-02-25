import { useState } from 'react';

import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createMessage, fetchMessageRoomMessages, fetchMessageRooms } from '@/apis/request';
import { LayoutComponent } from '@/components';
import { useToast } from '@/hooks';
import { useActivity, useFlow } from '@/stackflow';
import { mixins, theme } from '@/styles';
import type { SendMessageRequest, WithPostId } from '@/types';
import { resolveClientErrorMessage } from '@/utils/observability';

const MESSAGE_ROOMS_QUERY_KEY = ['message-rooms'] as const;
const MESSAGE_ROOM_MESSAGES_QUERY_KEY = (roomId: number) =>
  ['message-room-messages', roomId] as const;
const ROOM_MESSAGES_PAGE_SIZE = 50;
const ROOM_POLLING_INTERVAL_MS = 5_000;

const TalkDetailPage: ActivityComponentType<WithPostId> = () => {
  const activity = useActivity();
  const params = (activity.params ?? {}) as Partial<WithPostId>;
  const roomId = Number(params.id ?? 0);
  const queryClient = useQueryClient();
  const { pop } = useFlow();
  const { toast } = useToast();

  const [draft, setDraft] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const roomsQuery = useQuery({
    queryKey: MESSAGE_ROOMS_QUERY_KEY,
    queryFn: fetchMessageRooms,
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
  });

  const roomMessagesQuery = useQuery({
    queryKey: MESSAGE_ROOM_MESSAGES_QUERY_KEY(roomId),
    queryFn: () =>
      fetchMessageRoomMessages(roomId, {
        pageSize: ROOM_MESSAGES_PAGE_SIZE,
      }),
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
    refetchIntervalInBackground: true,
    enabled: Number.isInteger(roomId) && roomId > 0,
  });

  const roomMessages = roomMessagesQuery.data?.result.messages ?? [];
  const roomNameFromThread = roomMessagesQuery.data?.result.partnerNickname;
  const roomNameFromList = roomsQuery.data?.result.rooms.find(
    room => room.roomId === roomId,
  )?.partnerNickname;
  const roomTitle = roomNameFromThread ?? roomNameFromList ?? `쪽지방 #${roomId}`;

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessageRequest) => createMessage(payload),
    onSuccess: async () => {
      setDraft('');
      setSubmitError(null);
      await queryClient.invalidateQueries({
        queryKey: MESSAGE_ROOM_MESSAGES_QUERY_KEY(roomId),
      });
      await queryClient.invalidateQueries({
        queryKey: MESSAGE_ROOMS_QUERY_KEY,
      });
    },
    onError: error => {
      setSubmitError(resolveClientErrorMessage(error, '메시지 전송에 실패했습니다.'));
    },
  });

  const handleRefresh = async () => {
    const [roomsResult, messagesResult] = await Promise.all([
      roomsQuery.refetch(),
      roomMessagesQuery.refetch(),
    ]);

    if (roomsResult.isError || messagesResult.isError) {
      toast.error('메시지를 다시 불러오지 못했습니다.');
    }
  };

  const handleSendMessage = () => {
    const content = draft.trim();
    if (!content.length) {
      setSubmitError('쪽지 내용을 입력해주세요.');
      return;
    }

    setSubmitError(null);
    sendMessageMutation.mutate({
      roomId,
      content,
    });
  };

  if (!Number.isInteger(roomId) || roomId <= 0) {
    return (
      <LayoutComponent.Base navigationSlot={false}>
        <S.Container>
          <S.ErrorText>유효하지 않은 쪽지방입니다.</S.ErrorText>
          <S.BackButton type="button" onClick={pop}>
            목록으로 돌아가기
          </S.BackButton>
        </S.Container>
      </LayoutComponent.Base>
    );
  }

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.Title>{roomTitle}</S.Title>
          <S.Description>입장 중에는 5초마다 자동 새로고침됩니다.</S.Description>
          <S.ActionRow>
            <S.BackButton type="button" onClick={pop}>
              목록으로 돌아가기
            </S.BackButton>
            <S.RefreshButton type="button" onClick={handleRefresh}>
              수동 새로고침
            </S.RefreshButton>
          </S.ActionRow>
        </S.HeaderCard>

        <S.ChatCard>
          <S.MessageArea>
            {roomMessagesQuery.isLoading ? (
              <S.HelperText>메시지를 불러오는 중입니다.</S.HelperText>
            ) : null}
            {roomMessagesQuery.isError ? (
              <S.ErrorText>메시지 조회에 실패했습니다. 잠시 후 다시 시도해주세요.</S.ErrorText>
            ) : null}
            {!roomMessagesQuery.isLoading &&
            !roomMessagesQuery.isError &&
            roomMessages.length === 0 ? (
              <S.HelperText>첫 메시지를 보내 대화를 시작해보세요.</S.HelperText>
            ) : null}
            {!roomMessagesQuery.isLoading &&
            !roomMessagesQuery.isError &&
            roomMessages.length > 0 ? (
              <S.MessageList>
                {roomMessages.map(message => (
                  <S.MessageRow key={message.messageId} mine={message.mine}>
                    <S.MessageBubble mine={message.mine}>
                      <S.Sender>{message.senderNickname}</S.Sender>
                      <S.Content>{message.content}</S.Content>
                      <S.Meta>
                        {message.createdAt} · {message.readYn}
                      </S.Meta>
                    </S.MessageBubble>
                  </S.MessageRow>
                ))}
              </S.MessageList>
            ) : null}
          </S.MessageArea>

          <S.InputCard>
            <S.TextArea
              value={draft}
              onChange={event => setDraft(event.target.value)}
              placeholder="쪽지를 입력해주세요."
            />
            {submitError ? <S.ErrorText>{submitError}</S.ErrorText> : null}
            <S.SubmitButton
              type="button"
              onClick={handleSendMessage}
              disabled={sendMessageMutation.isPending}
            >
              {sendMessageMutation.isPending ? '전송 중...' : '전송'}
            </S.SubmitButton>
          </S.InputCard>
        </S.ChatCard>
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
  ActionRow: styled.div`
    ${mixins.flexAlignCenter};
    gap: 8px;
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
  RefreshButton: styled.button`
    ${theme.fonts.labelSmall};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    width: fit-content;
    padding: 6px 10px;
  `,
  ChatCard: styled.article`
    ${mixins.flexColumn};
    gap: 10px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 16px;
    background-color: ${theme.colors.white};
    padding: 12px;
  `,
  MessageArea: styled.div`
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 12px;
    background-color: ${theme.colors.gray[10]};
    min-height: 380px;
    max-height: 460px;
    overflow-y: auto;
    padding: 12px;
  `,
  MessageList: styled.ul`
    ${mixins.flexColumn};
    gap: 8px;
  `,
  MessageRow: styled.li<{ mine: boolean }>`
    ${mixins.flex};
    justify-content: ${({ mine }) => (mine ? 'flex-end' : 'flex-start')};
  `,
  MessageBubble: styled.div<{ mine: boolean }>`
    ${mixins.flexColumn};
    gap: 4px;
    max-width: 85%;
    border-radius: 12px;
    border: ${({ mine }) => (mine ? 'none' : `1px solid ${theme.colors.gray[30]}`)};
    color: ${({ mine }) => (mine ? theme.colors.white : theme.colors.gray[90])};
    background-color: ${({ mine }) => (mine ? theme.colors['key-color'] : theme.colors.white)};
    padding: 8px 10px;
  `,
  Sender: styled.p`
    ${theme.fonts.labelSmall};
    opacity: 0.85;
  `,
  Content: styled.p`
    ${theme.fonts.bodySmall};
    white-space: pre-wrap;
  `,
  Meta: styled.p`
    ${theme.fonts.bodySmall};
    opacity: 0.78;
  `,
  InputCard: styled.div`
    ${mixins.flexColumn};
    gap: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 12px;
    background-color: ${theme.colors.white};
    padding: 12px;
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
  HelperText: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
  `,
  ErrorText: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.red};
  `,
};

export default TalkDetailPage;
