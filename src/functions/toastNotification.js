import { toast } from "react-toastify"

export const toastSuccess = message => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: true,
  })
}

export const toastError = message => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: true,
  })
}
