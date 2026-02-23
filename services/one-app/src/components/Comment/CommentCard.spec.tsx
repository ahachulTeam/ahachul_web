import { fireEvent, render, screen } from '@testing-library/react';

import { CommentCard } from './CommentCard';

jest.mock('../Editor', () => ({
  ReadonlyEditor: ({ content }: { content: string }) => (
    <div data-testid="readonly-editor">{content}</div>
  ),
}));

describe('CommentCard', () => {
  const baseComment = {
    id: 10,
    title: '댓글',
    writer: '아하철러',
    content: '테스트 댓글 내용',
    createdAt: '2026-02-24T00:00:00+09:00',
    createdBy: '1',
    status: 'CREATED' as const,
    upperCommentId: null,
    isPrivate: false,
  };

  it('작성자 권한이 있으면 수정/삭제/답글 액션을 노출하고 콜백을 호출한다', () => {
    const onReply = jest.fn();
    const onEdit = jest.fn();
    const onDelete = jest.fn();

    render(
      <CommentCard
        comment={baseComment}
        canViewPrivate
        canEdit
        canReply
        onReply={onReply}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '수정' }));
    fireEvent.click(screen.getByRole('button', { name: '삭제' }));
    fireEvent.click(screen.getByRole('button', { name: '답글 달기' }));

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onReply).toHaveBeenCalledTimes(1);
  });

  it('비공개 댓글은 권한이 없으면 내용을 숨긴다', () => {
    render(
      <CommentCard
        comment={{
          ...baseComment,
          isPrivate: true,
          content: '숨겨져야 하는 댓글',
        }}
        canViewPrivate={false}
        canReply
      />,
    );

    expect(screen.getByText('비공개 댓글입니다.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '답글 달기' })).not.toBeInTheDocument();
  });

  it('삭제 댓글은 삭제 안내 문구를 노출한다', () => {
    render(
      <CommentCard
        comment={{
          ...baseComment,
          status: 'DELETED',
        }}
      />,
    );

    expect(screen.getByText('삭제된 댓글입니다.')).toBeInTheDocument();
  });
});
