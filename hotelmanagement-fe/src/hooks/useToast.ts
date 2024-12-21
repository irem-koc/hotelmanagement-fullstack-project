import { toast, ToastOptions } from "react-toastify";

interface NotifyProps {
  message: string;
  options?: ToastOptions;
}

export const useToast = () => {
  const notifySuccess = ({ message, options }: NotifyProps) => {
    toast.success(message, options);
  };

  const notifyError = ({ message, options }: NotifyProps) => {
    toast.error(message, options);
  };

  const notifyWarning = ({ message, options }: NotifyProps) => {
    toast.warning(message, options);
  };

  const notifyInfo = ({ message, options }: NotifyProps) => {
    toast.info(message, options);
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
  };
};
