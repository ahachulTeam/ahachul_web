import { useState } from "react";
import AccordionContext from "./AccordionContext";
import { AccordionProps } from "./types";
import { clsx } from "clsx";
import * as React from "react";
import { accordionStyle } from "./style.css";

const Accordion = (props: AccordionProps, ref: React.Ref<HTMLDivElement>) => {
  const { defaultActiveItems = [], children, className, ...rest } = props;

  const [activeItems, setActiveItems] =
    useState<string[]>(defaultActiveItems);

  const handleSetActiveItem = (item: string) => {
    if (activeItems.includes(item)) {
      setActiveItems(activeItems.filter((activeItem) => activeItem !== item));
    } else {
      setActiveItems([...activeItems, item]);
    }
  };  

  return (
    <AccordionContext.Provider
      value={{
        activeItems,
        setActiveItem: handleSetActiveItem,
      }}
    >
      <div {...rest} ref={ref} className={clsx([accordionStyle, className])}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const _Accordion = React.forwardRef(Accordion);
export { _Accordion as Accordion };
