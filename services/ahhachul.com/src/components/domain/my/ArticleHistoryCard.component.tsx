import styled from '@emotion/styled';

import { formatDisplayDate } from '@ahhachul/utils';

import { useFetchUserArticleHistories } from '@/services/user';
import { useFlow } from '@/stackflow';
import type { ArticleHistoryItem } from '@/types';

type HistoryType = 'likedArticles' | 'bookmarkedArticles';

const MAX_ITEMS = 8;

const HISTORY_LABELS: Record<HistoryType, string> = {
  likedArticles: '좋아요',
  bookmarkedArticles: '북마크',
};

const ArticleHistoryCard = () => {
  const { data, isLoading, isError, refetch } = useFetchUserArticleHistories(30);
  const { push } = useFlow();

  const handleOpenArticle = (item: ArticleHistoryItem) => {
    if (item.articleType === 'COMMUNITY') {
      push('CommunityDetailPage', { id: item.articleId });
      return;
    }

    if (item.articleType === 'COMPLAINT') {
      push('ComplaintDetailPage', { id: item.articleId });
      return;
    }

    push('LostFoundDetailPage', { id: item.articleId });
  };

  const renderHistoryList = (type: HistoryType) => {
    const list = data?.result?.[type] ?? [];

    if (!list.length) {
      return <EmptyText>{HISTORY_LABELS[type]}한 글이 없습니다.</EmptyText>;
    }

    return (
      <List>
        {list.slice(0, MAX_ITEMS).map(item => (
          <ListItem key={`${type}-${item.articleType}-${item.articleId}`}>
            <button type="button" onClick={() => handleOpenArticle(item)}>
              <p>{item.title}</p>
              <span>
                {item.articleType} · {formatDisplayDate(item.reactedAt, { format: 'short' })}
              </span>
            </button>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Wrapper>
      <Header>
        <h3>좋아요/북마크 히스토리</h3>
        <button type="button" onClick={() => void refetch()}>
          새로고침
        </button>
      </Header>

      {isLoading ? <StateText>히스토리를 불러오는 중입니다.</StateText> : null}
      {isError ? <StateText>히스토리를 불러오지 못했습니다.</StateText> : null}

      {!isLoading && !isError ? (
        <Content>
          <Section>
            <h4>좋아요</h4>
            {renderHistoryList('likedArticles')}
          </Section>
          <Section>
            <h4>북마크</h4>
            {renderHistoryList('bookmarkedArticles')}
          </Section>
        </Content>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  border: 1px solid var(--ah-color-legacy-border-soft);
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: var(--ah-color-legacy-text-strong);
  }

  button {
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 6px;
    background: #fff;
    height: 30px;
    padding: 0 10px;
    color: var(--ah-color-legacy-text-body);
  }
`;

const Content = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 12px;
`;

const Section = styled.section`
  background: var(--ah-color-legacy-surface-subtle);
  border-radius: 8px;
  padding: 12px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--ah-color-legacy-text-strong);
  }
`;

const List = styled.ul`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ListItem = styled.li`
  button {
    width: 100%;
    text-align: left;
    border: 1px solid var(--ah-color-legacy-border-soft);
    border-radius: 6px;
    background: #fff;
    padding: 8px 10px;
  }

  p {
    font-size: 13px;
    line-height: 18px;
    color: var(--ah-color-legacy-text-strong);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 11px;
    color: var(--ah-color-legacy-text-muted);
  }
`;

const StateText = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: var(--ah-color-legacy-text-muted);
`;

const EmptyText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: var(--ah-color-legacy-text-muted);
`;

export default ArticleHistoryCard;
