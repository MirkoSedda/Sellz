import { toastError } from "./toastNotification"

const validateInputs = (input1, input2) => {
  if (input1 === "" || input2 === "") {
    toastError("Please fill in all fields")
    return false
  }
}

export default validateInputs
