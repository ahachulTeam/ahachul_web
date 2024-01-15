import { vars } from "@ahhachul/design-system";
import { inputLeftAddonStyle } from "./style.css";
import { InputLeftAddonProps } from "./types";
import { clsx } from "clsx";

const InputLeftAddon = (props: InputLeftAddonProps) => {
  const { size = "md", color = "gray", children } = props;

  return (
    <div
      className={clsx([
        inputLeftAddonStyle({
          size,
        }),
      ])}
      style={{ color: vars.colors.$scale[color][900] }}
    >
      {children}
    </div>
  );
};

InputLeftAddon.displayName = "InputLeftAddon";
export { InputLeftAddon };
