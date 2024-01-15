import * as React from "react";
import { AccordionButtonProps } from "./types";
import { clsx } from "clsx";
import { accordionButtonStyle } from "./style.css";
import { useButton } from "@ahhachul/react-hooks-button";
import { useAccordionContext } from "./AccordionContext";
import { useCallback } from "react";

const AccordionButton = (
  props: AccordionButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) => {
  const { className, itemName = "", onClick, children, ...rest } = props;

  const { setActiveItem } = useAccordionContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setActiveItem(itemName);
      onClick?.(event);
    },
    [itemName, setActiveItem],
  );

  const { buttonProps } = useButton({
    ...rest,
    onClick: handleClick,
    elementType: "button",
  });

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={clsx([accordionButtonStyle, className])}
    >
      {children}
    </button>
  );
};

const _AccordionButton = React.forwardRef(AccordionButton);
export { _AccordionButton as AccordionButton };
