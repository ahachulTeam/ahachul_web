import Image from "next/image";
import { toast, ToastOptions } from "react-toastify";

import { Notification } from "@/assets/icons";

const useToast = () => {
  const success = (content: React.ReactNode, option?: ToastOptions) => {
    toast.success(content, {
      icon: false,
      ...option,
    });
  };

  const error = (content: React.ReactNode, option?: ToastOptions) => {
    toast.error(content, {
      icon: <Notification />,
      ...option,
    });
  };

  return { success, error };
};

export default useToast;
