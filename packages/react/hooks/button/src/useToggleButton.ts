import { useToggle } from "@ahhachul/react-hooks-toggle";
import { OverloadedToggleButtonFunction } from "./types";
import { useButton } from "./useButton";

export const useToggleButton: OverloadedToggleButtonFunction = (
  props: any,
  isSelected?: boolean,
): any => {
  const { isSelected: _isSelected, toggle } = useToggle({
    isSelected,
  });

  const handleClick = (event: React.MouseEvent) => {
    toggle();
    props?.onClick?.(event);
  };

  const { buttonProps } = useButton({
    ...props,
    onClick: handleClick,
  });

  return {
    buttonProps,
    isSelected: _isSelected,
  };
};
