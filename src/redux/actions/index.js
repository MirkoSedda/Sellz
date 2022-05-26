import { API_URL } from "../../costants"
import { toastSuccess, toastError } from "../../utils/toastNotification"
import "react-toastify/dist/ReactToastify.css"

export const loginUser = userData => {
  return async dispatch => {
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
        },
      })
      if (res.ok) {
        const { user, accessToken } = await res.json()
        console.log("user:", user)
        console.log("accessToken:", accessToken)
        dispatch({
          type: "LOGIN",
          payload: {
            user,
            accessToken,
          },
        })
        toastSuccess("Logged in successfully")
        return { accessToken, user }
      }
    } catch (error) {
      toastError(`Error logging in user: ${error}`)
      console.log(error)
    }
  }
}
