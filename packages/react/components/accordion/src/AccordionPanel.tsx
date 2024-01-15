import * as React from "react";
import { AccordionPanelProps } from "./types";
import { clsx } from "clsx";
import { accordionPanelStyle, panelHeight } from "./style.css";
import { useAccordionContext } from "./AccordionContext";
import { useEffect, useRef, useState } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

const AccordionPanel = (props: AccordionPanelProps, ref: React.Ref<HTMLDivElement>) => {
  const { itemName = "", children, className, style, ...rest } = props;
  const innerRef = useRef<HTMLDivElement>(null);

  const { activeItems } = useAccordionContext();
  const isActive = activeItems.includes(itemName);

  const [currentPanelHeight, setCurrentPanelHeight] = useState<string>();
  useEffect(() => {
    if (!innerRef.current) return;

    setCurrentPanelHeight(
      isActive ? `${innerRef.current.clientHeight}px` : "0",
    );
  }, [isActive, activeItems]);

  return (
    <div
      {...rest}
      ref={ref}
      className={clsx([accordionPanelStyle, className])}
      data-action-item={isActive}
      style={{
        ...assignInlineVars({
          [panelHeight]: currentPanelHeight ?? `$innerRef.current.clientHeight}px`,
        }),
        ...style,
      }}
    >
      <div data-name="panel-inner" ref={innerRef}>
        {children}
      </div>
    </div>
  );
}

const _AccordionPanel = React.forwardRef(AccordionPanel);
export { _AccordionPanel as AccordionPanel };
