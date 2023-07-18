import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import * as S from './styled'
import { View } from '@/atoms/view'

interface LostItemSkeletonProps {
  view?: View
  count?: number
}

export default function CommunityItemSkeleton({ view = 'list', count = 12 }: LostItemSkeletonProps) {
  return (
    <S.ArticleList>
      {Array.from({ length: count }, (_, i) => (
        <li key={i}>
          <S.SkeletonItem data-view={view}>
            <S.Contents>
              <S.Title>
                <Skeleton baseColor="#eeeeee" containerClassName="skeleton" height={19} width="45%" borderRadius={8} />
              </S.Title>
              <S.Content>
                <Skeleton baseColor="#eeeeee" containerClassName="skeleton" height={19} width="85%" borderRadius={8} />
              </S.Content>
              <S.Meta>
                <S.Metadata>
                  <Skeleton baseColor="#eeeeee" containerClassName="skeleton" width={28} borderRadius={8} />
                  <Skeleton baseColor="#eeeeee" containerClassName="skeleton" width={28} borderRadius={8} />
                  <Skeleton baseColor="#eeeeee" containerClassName="skeleton" width={28} borderRadius={8} />
                </S.Metadata>
                <S.Utils>
                  <Skeleton baseColor="#eeeeee" containerClassName="skeleton" width={24} borderRadius={8} />
                </S.Utils>
              </S.Meta>
            </S.Contents>
            <S.Thumbnail>
              <Skeleton baseColor="#eeeeee" containerClassName="skeleton" borderRadius={8} />
            </S.Thumbnail>
          </S.SkeletonItem>
        </li>
      ))}
    </S.ArticleList>
  )
}
