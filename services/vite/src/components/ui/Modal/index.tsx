import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { useKeyEscape } from '@/hooks'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title: string
}

function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useKeyEscape({ isOpen, onClose })

  if (!isOpen) {
    return null
  }

  return createPortal(
    <Overlay onClick={onClose}>
      <Content onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose}>
            <img src="/icons/x.svg" alt="close" />
          </CloseButton>
        </Header>
        {children}
      </Content>
    </Overlay>,
    document.body,
  )
}

export default Modal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
`

const Content = styled.div`
  background: white;
  padding: 64px;
  border-radius: 18px;
  min-width: 580px;
  min-height: 800px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const Title = styled.h1`
  ${({ theme }) => css`
    ${theme.typography.title.t1_sb}
    color: ${theme.colors.baseBlack};
  `}
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #666;

  &:hover {
    color: #000;
  }
`
