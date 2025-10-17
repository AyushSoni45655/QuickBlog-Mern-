import { toast } from "react-hot-toast";

let isToastVisible = false;
const toastQueue = [];

export const showSequentialToast = (message, type = "success") => {
  toastQueue.push({ message, type });
  processToastQueue();
};

const processToastQueue = () => {
  if (isToastVisible || toastQueue.length === 0) return;

  const { message, type } = toastQueue.shift();
  isToastVisible = true;

  const id = toast[type](message, {
    duration: 3000, // 3 seconds
    onClose: () => {
      isToastVisible = false;
      setTimeout(processToastQueue, 500); // अगला toast थोडा delay से
    },
  });
};