import { toast, ToastOptions } from "react-toastify";

const useToast = () => {
  const success = (content: React.ReactNode, option?: ToastOptions) => {
    toast.success(content, {
      // icon: <Image src="/images/??" width={20} height={20} />,
      ...option,
    });
  };

  const error = (content: React.ReactNode, option?: ToastOptions) => {
    toast.error(content, {
      // icon: <Image src="/images/??" width={20} height={20} />,
      ...option,
    });
  };

  return { success, error };
};

export default useToast;
