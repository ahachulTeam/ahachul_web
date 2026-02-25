import styled from '@emotion/styled';
import type { ActivityComponentType } from '@stackflow/react';
import { useQuery } from '@tanstack/react-query';

import { fetchMessageRooms } from '@/apis/request';
import { LayoutComponent } from '@/components';
import { useToast } from '@/hooks';
import { useFlow } from '@/stackflow';
import { mixins, theme } from '@/styles';

const MESSAGE_ROOMS_QUERY_KEY = ['message-rooms'] as const;
const ROOM_POLLING_INTERVAL_MS = 5_000;

const TalkPage: ActivityComponentType = () => {
  const { push } = useFlow();
  const { toast } = useToast();

  const roomsQuery = useQuery({
    queryKey: MESSAGE_ROOMS_QUERY_KEY,
    queryFn: fetchMessageRooms,
    refetchInterval: ROOM_POLLING_INTERVAL_MS,
  });

  const rooms = roomsQuery.data?.result.rooms ?? [];

  const handleRefresh = async () => {
    const result = await roomsQuery.refetch();
    if (result.isError) {
      toast.error('쪽지방 목록을 다시 불러오지 못했습니다.');
    }
  };

  const handleOpenRoom = (roomId: number) => {
    push('TalkDetailPage', { id: roomId });
  };

  return (
    <LayoutComponent.Base navigationSlot={false}>
      <S.Container>
        <S.HeaderCard>
          <S.Title>쪽지방 목록</S.Title>
          <S.Description>대화 상대를 선택하면 상세 채팅룸으로 이동합니다.</S.Description>
          <S.ActionRow>
            <S.RefreshButton type="button" onClick={handleRefresh}>
              수동 새로고침
            </S.RefreshButton>
            <S.NewButton type="button" onClick={() => push('TalkSettingPage', {})}>
              새 대화
            </S.NewButton>
          </S.ActionRow>
        </S.HeaderCard>

        <S.ListCard>
          {roomsQuery.isLoading ? <S.HelperText>쪽지방을 불러오는 중입니다.</S.HelperText> : null}
          {roomsQuery.isError ? (
            <S.ErrorText>쪽지방 목록 조회에 실패했습니다. 잠시 후 다시 시도해주세요.</S.ErrorText>
          ) : null}
          {!roomsQuery.isLoading && !roomsQuery.isError && rooms.length === 0 ? (
            <S.HelperText>참여 중인 쪽지방이 없습니다.</S.HelperText>
          ) : null}
          {!roomsQuery.isLoading && !roomsQuery.isError && rooms.length > 0 ? (
            <S.RoomList>
              {rooms.map(room => (
                <S.RoomItemButton
                  key={room.roomId}
                  type="button"
                  onClick={() => handleOpenRoom(room.roomId)}
                >
                  <S.RoomHeader>
                    <S.RoomPartner>{room.partnerNickname}</S.RoomPartner>
                    {room.unreadCount > 0 ? <S.Badge>{room.unreadCount}</S.Badge> : null}
                  </S.RoomHeader>
                  <S.RoomPreview>{room.lastMessageContent ?? '메시지가 없습니다.'}</S.RoomPreview>
                  <S.RoomDate>{room.lastMessageAt ?? '-'}</S.RoomDate>
                </S.RoomItemButton>
              ))}
            </S.RoomList>
          ) : null}
        </S.ListCard>
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
  RefreshButton: styled.button`
    ${theme.fonts.labelSmall};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    width: fit-content;
    padding: 6px 10px;
  `,
  NewButton: styled.button`
    ${theme.fonts.labelSmall};
    border: 1px solid ${theme.colors.gray[40]};
    border-radius: 10px;
    color: ${theme.colors.gray[90]};
    background-color: ${theme.colors.white};
    width: fit-content;
    padding: 6px 10px;
  `,
  ListCard: styled.article`
    ${mixins.flexColumn};
    gap: 8px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 16px;
    background-color: ${theme.colors.white};
    padding: 12px;
  `,
  RoomList: styled.ul`
    ${mixins.flexColumn};
    gap: 8px;
  `,
  RoomItemButton: styled.button`
    ${mixins.flexColumn};
    gap: 4px;
    border: 1px solid ${theme.colors.gray[30]};
    border-radius: 12px;
    background-color: ${theme.colors.white};
    text-align: left;
    padding: 10px 12px;
  `,
  RoomHeader: styled.div`
    ${mixins.flexAlignCenter};
    ${mixins.flexJustifySpaceBetween};
    gap: 8px;
  `,
  RoomPartner: styled.p`
    ${theme.fonts.labelMedium};
    color: ${theme.colors.gray[90]};
  `,
  Badge: styled.span`
    ${theme.fonts.labelSmall};
    border-radius: 999px;
    background-color: ${theme.colors['key-color']};
    color: ${theme.colors.white};
    padding: 2px 8px;
  `,
  RoomPreview: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[80]};
  `,
  RoomDate: styled.p`
    ${theme.fonts.bodySmall};
    color: ${theme.colors.gray[70]};
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

export default TalkPage;
