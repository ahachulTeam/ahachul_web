import { createContext } from "react";
import { ToastPayload } from "./types";

export type ToastConfigProps = {
  payload: ToastPayload;
  duration?: number;
}

export type ToastContextType = {
  toast: (toastProps: ToastConfigProps) => void;
};

export const ToastContext = createContext<ToastContextType>({
  toast: () => {},
}); 
