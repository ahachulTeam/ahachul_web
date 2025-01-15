import { useMemo } from 'react';
import Link from 'next/link';

import { Tag, Checkbox } from '@/components';
import { AmountType, PeriodType } from '@/types';
import { PATH } from '@/constants';
import * as S from './List.styled';

interface ListProps {
  className?: string;
  children?: React.ReactNode;
}

interface ListItemProps {
  className?: string;
  supportingId: string;
  title: string;
  institution?: string;
  amountType?: AmountType;
  amount?: string;
  periodType?: PeriodType;
  closeDate?: string | null;
  tags?: string[];
  index?: number;
  isRecommend?: boolean;
}

interface CheckItemProps extends Omit<ListItemProps, 'meta'> {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ListCardProps {
  className?: string;
  supportingId: string;
  title: string;
  institution: string;
}

const List = ({ className, children }: ListProps) => {
  return <ul className={className}>{children}</ul>;
};

List.Item = function ListItem({
  className,
  supportingId,
  title,
  institution,
  amountType,
  amount,
  periodType,
  closeDate,
  tags,
  index,
  isRecommend = false,
}: ListItemProps) {
  const amountData = useMemo(() => {
    switch (amountType) {
      case 'etc':
        return '공고문 참고';

      default:
        return amount;
    }
  }, [amountType, amount]);

  const periodData = useMemo(() => {
    switch (periodType) {
      case 'date':
        return closeDate;

      case 'always':
        return '상시지원';

      case 'first_come':
        return '선착순 마감';

      case 'spent':
        return '예산 소진시 마감';

      default:
        return '';
    }
  }, [periodType, closeDate]);
  return (
    <S.ListItem className={className}>
      <Link href={`${PATH.project}/${supportingId}`} passHref>
        <S.AnchorWrapper>
          {(isRecommend || index) && (
            <S.Metadata isRecommend={isRecommend}>
              <span>{isRecommend ? '맞춤' : index}</span>
            </S.Metadata>
          )}
          <div>
            <S.Title isRecommend={isRecommend}>{title}</S.Title>
            <S.DescList>
              {institution && (
                <S.Desc>
                  <dt>접수기관명</dt>
                  <dd>{institution}</dd>
                </S.Desc>
              )}
              {amount && (
                <S.Desc>
                  <dt>지원금액</dt>
                  <dd>{amountData}</dd>
                </S.Desc>
              )}
              {periodType && (
                <S.Desc>
                  <dt>마감일자</dt>
                  <dd>{periodData}</dd>
                </S.Desc>
              )}
            </S.DescList>
            {tags && (
              <S.TagList>
                {tags.map((tag, i) => (
                  <Tag css={S.tag} key={i} tag="li" label={tag} />
                ))}
              </S.TagList>
            )}
          </div>
        </S.AnchorWrapper>
      </Link>
    </S.ListItem>
  );
};

List.CheckItem = function CheckItem({
  className,
  id,
  supportingId,
  checked,
  title,
  institution,
  amountType,
  amount,
  periodType,
  closeDate,
  tags,
  onChange,
}: CheckItemProps) {
  const amountData = useMemo(() => {
    switch (amountType) {
      case 'amount':
        return `최대 ${amount}만원`;

      case 'etc':
        return '공고문 참고';

      default:
        return '';
    }
  }, [amountType, amount]);
  const periodData = useMemo(() => {
    switch (periodType) {
      case 'date':
        return closeDate;

      case 'always':
        return '상시지원';

      case 'first_come':
        return '선착순 마감';

      case 'spent':
        return '예산 소진시 마감';

      default:
        return '';
    }
  }, [periodType, closeDate]);
  return (
    <S.CheckItem className={className}>
      <Checkbox
        id={id}
        checked={checked}
        ariaLabel="사업 선택하기"
        value={id}
        onChange={onChange}
      />
      <S.Content>
        <Link href={`${PATH.project}/${supportingId}`} passHref>
          <S.Anchor>
            <S.Title>{title}</S.Title>
            <S.DescList>
              {institution && (
                <S.Desc>
                  <dt>접수기관명</dt>
                  <dd>{institution}</dd>
                </S.Desc>
              )}
              {amount && (
                <S.Desc>
                  <dt>지원금액</dt>
                  <dd>{amountData}</dd>
                </S.Desc>
              )}
              <S.Desc>
                <dt>마감일자</dt>
                <dd>{periodData}</dd>
              </S.Desc>
            </S.DescList>
            {tags && (
              <S.TagList>
                {tags.map((tag, i) => (
                  <Tag css={S.tag} key={i} label={tag} />
                ))}
              </S.TagList>
            )}
          </S.Anchor>
        </Link>
      </S.Content>
    </S.CheckItem>
  );
};

List.Card = function ListCard({ className, supportingId, title, institution }: ListCardProps) {
  return (
    <S.ListCard className={className}>
      <Link href={`${PATH.project}/${supportingId}`} passHref>
        <S.CardAnchor>
          <h3>{title}</h3>
          <span>{institution}</span>
        </S.CardAnchor>
      </Link>
    </S.ListCard>
  );
};

export default List;
