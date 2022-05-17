import { useState } from "react"
import { LOGIN_URL } from "../../costants"
import { toastSuccess, toastError } from "../../utils/toastNotification"
import "react-toastify/dist/ReactToastify.css"

export const loginUser = userData => {
  return async dispatch => {
    const [loading, loadingSetter] = useState(false)
    const [error, errorSetter] = useState(false)
    try {
      loadingSetter(true)
      const res = await fetch(LOGIN_URL, {
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
        window.localStorage.setItem("user", JSON.stringify(user))
        window.localStorage.setItem("accessToken", JSON.stringify(accessToken))
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
      errorSetter(true)
      toastError(`Error logging in user: ${error}`)
      console.log(error)
    } finally {
      loadingSetter(false)
    }
  }
}
