"use client";

import { useEffect, RefObject } from "react";

type Listener = (e: KeyboardEvent) => void;

export default function useArrowKeyTrap(ref: RefObject<HTMLElement>) {
  const getParseMenuKeyTrap = (e: KeyboardEvent) => {
    const menuNodeList = Array.from(
      (ref.current as HTMLElement).querySelectorAll(
        "[role='menuitem'], [role='menuitemradio'], [role='menuitemcheckbox']"
      )
    );
    const eventTarget = e.target;
    const firstMenuNdoe = menuNodeList[0] as HTMLElement;
    const lastMenuNode = menuNodeList.at(-1) as HTMLElement;
    const isFirstMenuNdoe = Object.is(eventTarget, firstMenuNdoe);
    const isLastMenuNode = Object.is(eventTarget, lastMenuNode);
    const index = Array.from(menuNodeList).indexOf(eventTarget as HTMLElement);
    const prevMenuNode = menuNodeList[Math.max(index - 1, 0)] as HTMLElement;
    const nextMenuNode = menuNodeList[Math.min(index + 1, menuNodeList.length - 1)] as HTMLElement;

    return {
      menuNodeList,
      firstMenuNdoe,
      lastMenuNode,
      isFirstMenuNdoe,
      isLastMenuNode,
      prevMenuNode,
      nextMenuNode,
    };
  };

  const handleSelectedToPrevMenu = (e: KeyboardEvent) => {
    if (!ref.current) return;
    e.preventDefault();
    const { isFirstMenuNdoe, lastMenuNode, prevMenuNode } = getParseMenuKeyTrap(e);
    if (isFirstMenuNdoe) {
      lastMenuNode.focus();
      return;
    }

    prevMenuNode.focus();
  };

  const handleSelectedToNextMenu = (e: KeyboardEvent) => {
    if (!ref.current) return;
    e.preventDefault();
    const { isLastMenuNode, firstMenuNdoe, nextMenuNode } = getParseMenuKeyTrap(e);
    if (isLastMenuNode) {
      firstMenuNdoe.focus();
      return;
    }

    nextMenuNode.focus();
  };

  const handleFocusFirstMenu = (e: KeyboardEvent) => {
    if (!ref.current) {
      return;
    }
    e.preventDefault();

    const { firstMenuNdoe } = getParseMenuKeyTrap(e);
    firstMenuNdoe.focus();
  };

  const handleFocusLastMenu = (e: KeyboardEvent) => {
    if (!ref.current) {
      return;
    }
    e.preventDefault();

    const { lastMenuNode } = getParseMenuKeyTrap(e);
    lastMenuNode.focus();
  };

  useEffect(() => {
    const keyListenerMap = new Map<string, Listener>([
      ["Up", handleSelectedToPrevMenu],
      ["ArrowUp", handleSelectedToPrevMenu],
      ["Down", handleSelectedToNextMenu],
      ["ArrowDown", handleSelectedToNextMenu],
      ["Home", handleFocusFirstMenu],
      ["End", handleFocusLastMenu],
    ]);

    const handleKeyListener = (e: KeyboardEvent) => {
      const listener = keyListenerMap.get(e.key);
      if (listener) {
        listener(e);
      }
    };

    window.addEventListener("keydown", handleKeyListener);

    return () => {
      window.removeEventListener("keydown", handleKeyListener);
    };
  }, []);
}
