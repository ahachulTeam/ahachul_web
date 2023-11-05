/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useRef, useEffect } from 'react'

import useOnClickOutside from './useOnClickOutside'
import { ITEM_FOCUS_ID } from '@/constants'

type DialogType = 'menu' | 'listbox'

const DIALOG_TYPE = {
  MENU: 'menu',
  LISTBOX: 'listbox',
} as const

const useDialog = (type: DialogType = DIALOG_TYPE.LISTBOX) => {
  const dialogRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [dialogOpener, setDialogOpener] = useState<Element | null>(null)

  const handleDialogOpen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setDialogOpener(document.activeElement)
      setIsOpen(true)
      if (type === DIALOG_TYPE.LISTBOX) {
        setTimeout(() => {
          dialogRef.current?.focus()
        })
      } else {
        setTimeout(() => {
          if (!dialogRef.current) {
            return
          }
          const focusableNodeList = dialogRef.current.querySelectorAll('[href], button:not([disabled])')
          ;(focusableNodeList[0] as HTMLElement).focus()
        })
      }
    },
    [dialogRef]
  )

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
    if (dialogOpener && isOpen) {
      ;(dialogOpener as HTMLElement).focus()
    }
  }, [dialogOpener, isOpen])

  const handleToggleDialog = useCallback(
    (e: React.MouseEvent) => {
      if (isOpen) {
        handleDialogClose()
      } else {
        handleDialogOpen(e)
      }
    },

    [handleDialogOpen, handleDialogClose, isOpen]
  )

  const handleListboxKeyTrap = useCallback(
    (e: KeyboardEvent) => {
      const { shiftKey } = e
      const eventTarget = e.target

      if (dialogRef.current) {
        const optionNodeList = Array.prototype.slice.call(dialogRef.current.querySelectorAll("[role='option']"))
        if (!optionNodeList.length) {
          return
        }
        const firstOptionNdoe = optionNodeList[0] as HTMLElement
        const lastOptionNode = optionNodeList[optionNodeList.length - 1] as HTMLElement
        const isFirstOptionNdoe = firstOptionNdoe.contains(eventTarget as HTMLElement)
        const isLastOptionNode = lastOptionNode.contains(eventTarget as HTMLElement)
        const currentNodeIdx = optionNodeList.findIndex(node => node.contains(eventTarget))

        if (
          (!shiftKey && isLastOptionNode) ||
          (shiftKey && isFirstOptionNdoe) ||
          (shiftKey && eventTarget === dialogRef.current)
        ) {
          if (currentNodeIdx !== -1) {
            optionNodeList[currentNodeIdx].setAttribute('id', '')
          }
          handleDialogClose()
        } else if (currentNodeIdx !== -1) {
          optionNodeList[currentNodeIdx].setAttribute('id', '')
          if (shiftKey) {
            optionNodeList[currentNodeIdx - 1].setAttribute('id', ITEM_FOCUS_ID)
          } else {
            optionNodeList[currentNodeIdx + 1].setAttribute('id', ITEM_FOCUS_ID)
          }
        }
      }
    },
    [dialogRef]
  )

  const getParseMenuKeyTrap = (e: KeyboardEvent) => {
    const menuNodeList = Array.prototype.slice.call(dialogRef.current!.querySelectorAll("[role='menuitem']"))
    const eventTarget = e.target
    const firstMenuNdoe = menuNodeList![0] as HTMLElement
    const lastMenuNode = menuNodeList![menuNodeList!.length - 1] as HTMLElement
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

  const handleMenuKeyTrap = useCallback(() => {
    handleDialogClose()
  }, [handleDialogClose])

  const handleSelectedToPrevMenu = (e: KeyboardEvent) => {
    if (!dialogRef.current) {
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

  const handleSelectedToNextMenu = (e: KeyboardEvent) => {
    if (!dialogRef.current) {
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

  const handleFocusFirstMenu = (e: KeyboardEvent) => {
    if (!dialogRef.current) {
      return
    }
    e.preventDefault()

    const { firstMenuNdoe } = getParseMenuKeyTrap(e)
    firstMenuNdoe.focus()
  }

  const handleFocusLastMenu = (e: KeyboardEvent) => {
    if (!dialogRef.current) {
      return
    }
    e.preventDefault()

    const { lastMenuNode } = getParseMenuKeyTrap(e)
    lastMenuNode.focus()
  }

  useOnClickOutside(dialogRef, handleDialogClose, dialogOpener as HTMLElement)

  useEffect(() => {
    if (!dialogRef.current) {
      return
    }

    const listboxKeyListenerMap = new Map<string, Function>([
      ['Escape', handleDialogClose],
      ['Tab', handleListboxKeyTrap],
    ])

    const menukeyListenerMap = new Map<string, Function>([
      ['Escape', handleDialogClose],
      ['Tab', handleMenuKeyTrap],
      ['Up', handleSelectedToPrevMenu],
      ['ArrowUp', handleSelectedToPrevMenu],
      ['Down', handleSelectedToNextMenu],
      ['ArrowDown', handleSelectedToNextMenu],
      ['Home', handleFocusFirstMenu],
      ['End', handleFocusLastMenu],
    ])

    const handleKeyListener = (e: KeyboardEvent) => {
      const listener = type === DIALOG_TYPE.LISTBOX ? listboxKeyListenerMap.get(e.key) : menukeyListenerMap.get(e.key)
      if (listener) {
        listener(e)
      }
    }

    dialogRef.current.addEventListener('keydown', handleKeyListener)
  }, [dialogRef, handleDialogClose])

  return {
    isOpen,
    dialogRef,
    handleDialogOpen,
    handleDialogClose,
    handleToggleDialog,
    setIsOpen,
  }
}

export default useDialog
