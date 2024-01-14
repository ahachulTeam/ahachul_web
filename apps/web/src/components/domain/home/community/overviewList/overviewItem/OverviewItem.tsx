import { Badge } from '@ahhachul/ui'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

import { CommunityOverViewModel } from '@/types'

interface OverviewItemProps {
  data: CommunityOverViewModel
}

function OverviewItem({ data }: OverviewItemProps) {
  return (
    <Item>
      <Link href={`community/${data.id}`}>
        <Flex>
          <h4>{data.title}</h4>
          <p>{data.content}</p>
          <Box>
            <Badge variant={data.subwayLineId} isHottest />
          </Box>
        </Flex>
        <Thumbnail>
          <Image src={'/images/default_thumbnail.svg'} fill alt="community item thumbnail" />
        </Thumbnail>
      </Link>
    </Item>
  )
}

const Item = styled.li`
  & > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 16px;
    padding: 15px 0;
  }
`

const Flex = styled.div`
  ${({ theme }) => css`
    flex: 1 0;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
    height: 100%;

    & > h4 {
      ${theme.fonts.bold14};
      color: ${theme.colors.black};
    }

    & > p {
      ${theme.fonts.regular12};
      color: ${theme.colors.black};
      font-weight: 300;
    }
  `}
`

const Box = styled.span`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    padding-top: 4px;

    & > b {
      ${theme.fonts.regular12};
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      height: 20px;
      border-radius: 3px;
      padding: 2px 8px;
      color: ${theme.colors.white};
      background-color: #bc2a38;
    }
  `}
`

const Thumbnail = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    width: 75px;
    aspect-ratio: 75 / 69;
    border-radius: 5px;
    background-color: ${theme.colors.gray_18};
    overflow: hidden;
  `}
`

export default OverviewItem
