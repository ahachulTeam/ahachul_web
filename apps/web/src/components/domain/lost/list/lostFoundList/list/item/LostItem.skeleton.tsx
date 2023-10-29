import Skeleton from 'react-loading-skeleton'

import * as S from './styled'
import { ViewStatusType } from '@/atoms/view'

interface LostItemSkeletonProps {
  view?: ViewStatusType
  count?: number
}

export default function LostItemSkeleton({ view = 'list', count = 12 }: LostItemSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <S.LostItem data-view={view}>
            <S.Thumbnail>
              <Skeleton containerClassName="skeleton" />
            </S.Thumbnail>
            <S.Contents>
              <S.Title>
                <Skeleton containerClassName="skeleton" height={19} />
              </S.Title>
              <S.Content>
                <Skeleton containerClassName="skeleton" height={32} />
              </S.Content>
              <S.Meta>
                <S.Metadata>
                  <Skeleton containerClassName="skeleton" width={28} />
                  <Skeleton containerClassName="skeleton" width={28} />
                </S.Metadata>
                <S.Utils>
                  <Skeleton containerClassName="skeleton" width={24} />
                </S.Utils>
              </S.Meta>
            </S.Contents>
          </S.LostItem>
        </li>
      ))}
    </>
  )
}
