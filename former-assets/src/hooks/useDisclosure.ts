import { useRef, useState, useCallback, useEffect } from "react";

const useDisclosure = () => {
  const dialoglRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = useCallback((event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    setIsOpen(true);
    setTimeout(() => dialoglRef.current?.focus());
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText =
        "overflow-y: hidden; touch-action: none; -ms-touch-action: none; -webkit-overflow-scrolling: none; overscroll-behavior: none;";
      openerRef.current = document.activeElement as HTMLElement;
    } else {
      document.body.style.cssText = "overflow-y: overlay;";
      if (openerRef.current) {
        openerRef.current.focus();
      }
    }

    return () => {
      document.body.style.cssText = "overflow-y: overlay;";
    };
  }, [isOpen]);

  return {
    dialoglRef,
    isOpen,
    onOpen,
    onClose,
  };
};

export default useDisclosure;
