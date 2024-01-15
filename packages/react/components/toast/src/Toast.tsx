import { toastStyle } from "./styles.css";
import { ToastPayload } from "./types";

export const Toast = (props: ToastPayload) => {
  const { message } = props;

  return <div className={toastStyle}>{message}</div>;
};
