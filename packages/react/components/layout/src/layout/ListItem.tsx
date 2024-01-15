import * as React from "react";
import { ListItemProps } from "./types";
import { Text } from "../typography";

const ListItem = (props: ListItemProps, ref: React.Ref<HTMLLIElement>) => {

  return <Text {...props} ref={ref} as="li" />;
}

const _ListItem = React.forwardRef(ListItem)
export { _ListItem as ListItem }
