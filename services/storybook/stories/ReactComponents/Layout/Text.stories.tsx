import "@ahhachul/react-components-layout/style.css";
import { Text as _Text } from "@ahhachul/react-components-layout";
import { classes, vars } from "@ahhachul/themes";

export default {
  title: "React Components/Layout/Typography/Text",
  component: _Text,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    as: {
      options: ["p", "span", "div", "b", "i", "u", "strong", "em"],
      control: "select",
    },
    fontSize: {
      options: Object.keys(classes.typography.text),
      control: "select",
    },
    color: {
      options: Object.keys(vars.colors.$scale),
      control: "select",
    },
  },
};

export const Text = {
  args: {
    as: "p",
    children: "Hello World",
    fontSize: "xl",
    color: "gray",
    background: "blue",
  },
};
