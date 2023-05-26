import { VoidFunction } from '@ahhachul/lib'
import styled from '@emotion/styled'
import { ArrowIcon, KenllIcon, LogoIcon, MiniHamburgerIcon, ProfileIcon, SearchIcon, ShareIcon } from '@/assets/icons'

type DefaultHeaderCbTypes = {
  onLogoBtnClick: VoidFunction
  onProfileBtnClick: VoidFunction
  onAlarmBtnClick: VoidFunction
}

export const defaultHeader = ({ onLogoBtnClick, onProfileBtnClick, onAlarmBtnClick }: DefaultHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onLogoBtnClick}>
      <LogoIcon />
    </IconButton>
  ),
  rightNodes: () => (
    <Flex>
      <IconButton onClick={onProfileBtnClick}>
        <ProfileIcon />
      </IconButton>
      <IconButton onClick={onAlarmBtnClick}>
        <KenllIcon />
      </IconButton>
    </Flex>
  ),
})

type LoginHeaderCbTypes = {
  onGoBackBtnClick: VoidFunction
}

export const loginHeader = ({ onGoBackBtnClick }: LoginHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
  title: '로그인',
})

type AlarmHeaderCbTypes = {
  onGoBackBtnClick: VoidFunction
  onDeleteBtnClick: VoidFunction
}

export const alarmHeader = ({ onGoBackBtnClick, onDeleteBtnClick }: AlarmHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
  title: '알림',
  rightNodes: () => <IconButton onClick={onDeleteBtnClick}>삭제</IconButton>,
})

type CommunityHeaderCbTypes = {
  onLogoBtnClick: VoidFunction
  onSearchBtnClick: VoidFunction
  onAlarmBtnClick: VoidFunction
}

export const communityHeader = ({ onLogoBtnClick, onSearchBtnClick, onAlarmBtnClick }: CommunityHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onLogoBtnClick}>
      <LogoIcon />
    </IconButton>
  ),
  rightNodes: () => (
    <Flex>
      <IconButton onClick={onSearchBtnClick}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={onAlarmBtnClick}>
        <KenllIcon />
      </IconButton>
    </Flex>
  ),
})

type CommunityDetailHeaderCbTypes = {
  title: string
  onGoBackBtnClick: VoidFunction
  onShareBtnClick: VoidFunction
  onHamburgerBtnClick: VoidFunction
}

export const communityDetailHeader = ({
  onGoBackBtnClick,
  title,
  onShareBtnClick,
  onHamburgerBtnClick,
}: CommunityDetailHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
  title,
  rightNodes: () => (
    <Flex>
      <IconButton onClick={onShareBtnClick}>
        <ShareIcon />
      </IconButton>
      <IconButton onClick={onHamburgerBtnClick}>
        <MiniHamburgerIcon />
      </IconButton>
    </Flex>
  ),
})

type LostHeaderCbTypes = {
  onLogoBtnClick: VoidFunction
  onSearchBtnClick: VoidFunction
  onAlarmBtnClick: VoidFunction
}

export const lostHeader = ({ onLogoBtnClick, onSearchBtnClick, onAlarmBtnClick }: LostHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onLogoBtnClick}>
      <LogoIcon />
    </IconButton>
  ),
  rightNodes: () => (
    <Flex>
      <IconButton onClick={onSearchBtnClick}>
        <SearchIcon />
      </IconButton>
      <IconButton onClick={onAlarmBtnClick}>
        <KenllIcon />
      </IconButton>
    </Flex>
  ),
})

type LostDetailHeaderCbTypes = {
  title: string
  onGoBackBtnClick: VoidFunction
  onShareBtnClick: VoidFunction
}

export const lostDetailHeader = ({ onGoBackBtnClick, title, onShareBtnClick }: LostDetailHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
  title,
  rightNodes: () => (
    <IconButton onClick={onShareBtnClick}>
      <ShareIcon />
    </IconButton>
  ),
})

type NotFoundHeaderCbTypes = {
  onGoBackBtnClick: VoidFunction
}

export const notFoundHeader = ({ onGoBackBtnClick }: NotFoundHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
})

type MyPageHeaderCbTypes = {
  onGoBackBtnClick: VoidFunction
}

export const myPageHeader = ({ onGoBackBtnClick }: MyPageHeaderCbTypes) => ({
  leftIcon: () => (
    <IconButton onClick={onGoBackBtnClick}>
      <ArrowIcon />
    </IconButton>
  ),
})

const IconButton = styled.button`
  all: unset;
  cursor: pointer;
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  height: 100%;
`
