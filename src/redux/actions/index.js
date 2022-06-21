import { API_URL } from "../../costants"
import { getUserCart } from "../../functions/user"
import { toastInfo, toastError } from "../../functions/toastNotification"
import "react-toastify/dist/ReactToastify.css"
const loginUser = userData => {
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
        getUserCart(accessToken).then(res => {
          console.log("RES", res)
        })
        toastInfo("Logged in successfully")
        return { accessToken, user }
      }
    } catch (error) {
      toastError(`Error logging in user: ${error}`)
      console.log(error)
    }
  }
}
export default loginUser
