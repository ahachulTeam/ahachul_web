import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render, screen, userEvent } from '@/lib/test-utils';
import type { Comment } from '@/types';

import CommentListItem from './CommentListItem.component';

const commentState = vi.hoisted(() => ({
  push: vi.fn(),
  userMemberId: 1,
}));

vi.mock('@stackflow/react', () => ({
  useActivity: () => ({
    params: { id: '55' },
  }),
}));

vi.mock('@/stackflow', () => ({
  useFlow: () => ({
    push: commentState.push,
  }),
}));

vi.mock('@/hooks/domain', () => ({
  useUser: () => ({
    user: { memberId: commentState.userMemberId },
  }),
}));

vi.mock('@/components', () => ({
  UiComponent: {
    ReadonlyEditor: ({ content }: { content: string }) => (
      <div data-testid="readonly-editor">{content}</div>
    ),
  },
}));

vi.mock('@ahhachul/utils', () => ({
  formatDisplayDate: () => '2026.02.18',
}));

vi.mock('../commentActions/CommentActions.component', () => ({
  CommentDropEllipsis: () => <button data-testid="comment-actions">actions</button>,
}));

describe('CommentListItem', () => {
  const baseComment: Comment = {
    id: 777,
    title: 'comment',
    writer: '작성자',
    content: '댓글 내용',
    createdAt: '2026-02-18T10:00:00.000Z',
    createdBy: '2',
    status: 'CREATED',
    upperCommentId: null,
    isPrivate: false,
  };

  beforeEach(() => {
    commentState.push.mockReset();
    commentState.userMemberId = 1;
  });

  it('비공개 댓글 권한이 없으면 내용을 숨긴다', () => {
    render(<CommentListItem comment={{ ...baseComment, isPrivate: true }} />);

    expect(screen.getByText('비공개 댓글입니다.')).toBeInTheDocument();
    expect(screen.queryByTestId('readonly-editor')).not.toBeInTheDocument();
  });

  it('queryKey/servicePath가 있으면 답글 버튼으로 플로우 이동이 가능하다', async () => {
    const queryKey = ['community', 'comments'] as const;
    const servicePath = 'COMMUNITY' as any;

    render(<CommentListItem comment={baseComment} queryKey={queryKey} servicePath={servicePath} />);

    expect(screen.getByTestId('comment-actions')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: '답글 달기' }));

    expect(commentState.push).toHaveBeenCalledTimes(1);
    expect(commentState.push).toHaveBeenCalledWith('NewCommentReplyPage', {
      commentId: 777,
      id: 55,
      queryKey,
      servicePath,
    });
  });
});
