import { RefObject } from 'react'

type Listener = (e: React.KeyboardEvent) => void
type Direction = 'col' | 'row'

export const useArrowKeyTrap = (ref: RefObject<HTMLElement>, direction: Direction = 'col') => {
  const getParseMenuKeyTrap = (e: React.KeyboardEvent) => {
    const menuNodeList = Array.from(
      (ref.current as HTMLElement).querySelectorAll(
        "[role='menuitem'], [role='menuitemradio'], [role='menuitemcheckbox']"
      )
    )

    const eventTarget = e.target
    const firstMenuNdoe = menuNodeList[0] as HTMLElement
    const lastMenuNode = menuNodeList.at(-1) as HTMLElement
    const isFirstMenuNdoe = Object.is(eventTarget, firstMenuNdoe)
    const isLastMenuNode = Object.is(eventTarget, lastMenuNode)
    const index = Array.from(menuNodeList).indexOf(eventTarget as HTMLElement)
    const prevMenuNode = menuNodeList[Math.max(index - 1, 0)] as HTMLElement
    const nextMenuNode = menuNodeList[Math.min(index + 1, menuNodeList.length - 1)] as HTMLElement

    return {
      menuNodeList,
      firstMenuNdoe,
      lastMenuNode,
      isFirstMenuNdoe,
      isLastMenuNode,
      prevMenuNode,
      nextMenuNode,
    }
  }

  const handleSelectedToPrevNode = (e: React.KeyboardEvent) => {
    if (!ref.current) {
      return
    }
    e.preventDefault()
    const { isFirstMenuNdoe, lastMenuNode, prevMenuNode } = getParseMenuKeyTrap(e)
    if (isFirstMenuNdoe) {
      lastMenuNode.focus()
      return
    }

    prevMenuNode.focus()
  }

  const handleSelectedToNextNode = (e: React.KeyboardEvent) => {
    if (!ref.current) {
      return
    }
    e.preventDefault()
    const { isLastMenuNode, firstMenuNdoe, nextMenuNode } = getParseMenuKeyTrap(e)

    if (isLastMenuNode) {
      firstMenuNdoe.focus()
      return
    }

    nextMenuNode.focus()
  }

  const handleFocusFirstNode = (e: React.KeyboardEvent) => {
    if (!ref.current) {
      return
    }
    e.preventDefault()

    const { firstMenuNdoe } = getParseMenuKeyTrap(e)
    firstMenuNdoe.focus()
  }

  const handleFocusLastNode = (e: React.KeyboardEvent) => {
    if (!ref.current) {
      return
    }
    e.preventDefault()

    const { lastMenuNode } = getParseMenuKeyTrap(e)
    lastMenuNode.focus()
  }

  const getKeyListenerMap = (direction: Direction) => {
    const rowKeyListenerMap = new Map<string, Listener>([
      ['Left', handleSelectedToPrevNode],
      ['ArrowLeft', handleSelectedToPrevNode],
      ['Right', handleSelectedToNextNode],
      ['ArrowRight', handleSelectedToNextNode],
      ['Home', handleFocusFirstNode],
      ['End', handleFocusLastNode],
    ])

    const colKeyListenerMap = new Map<string, Listener>([
      ['Up', handleSelectedToPrevNode],
      ['ArrowUp', handleSelectedToPrevNode],
      ['Down', handleSelectedToNextNode],
      ['ArrowDown', handleSelectedToNextNode],
      ['Home', handleFocusFirstNode],
      ['End', handleFocusLastNode],
    ])

    return direction === 'col' ? colKeyListenerMap : rowKeyListenerMap
  }

  const handleKeyListener = (e: React.KeyboardEvent) => {
    const keyListenerMap = getKeyListenerMap(direction)

    const listener = keyListenerMap.get(e.key)
    if (listener) {
      listener(e)
    }
  }

  return {
    handleKeyListener,
  }
}
