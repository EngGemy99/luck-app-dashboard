import { toast } from "react-toastify";

export const ToastMessage = (type, message) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: localStorage.getItem("currentMode"),
  });
};
