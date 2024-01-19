import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { toastState } from "@/stores/common";
import type { Toast } from "../core/types";

export const useToast = () => {
  const setToastCompo = useSetRecoilState(toastState);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = uuidv4();

    setToastCompo((prev) => [{ id, ...toast }, ...prev]);
  };

  const removeToast = (id: string) =>
    setToastCompo((prev) => prev.filter((toast) => toast.id !== id));

  return { addToast, removeToast };
};
