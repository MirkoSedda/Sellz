import axios from "axios"
import { API_URL } from "../costants"
import { toastSuccess, toastError } from "./toastNotification"
import "react-toastify/dist/ReactToastify.css"

export const registerUser = async user => {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    })
    const { _id } = await res.json()
    console.log("_id:", _id)
    toastSuccess("Thanks for registering")
    return { _id }
  } catch (error) {
    toastError(`Error registering user: ${error}`)
    console.log(error)
  }
}

export const userCart = async (userId, cart, accessToken) =>
  await axios.post(
    `${API_URL}/users/cart/${userId}`,
    { cart },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )

export const getUserCart = async (userId, accessToken) =>
  await axios.get(`${API_URL}/users/cart/${userId}`, {
    headers: {
      authorization: accessToken,
    },
  })

export const emptyUserCart = async (userId, accessToken) =>
  await axios.delete(`${API_URL}/users/cart/${userId}`, {
    headers: {
      authorization: accessToken,
    },
  })

export const saveUserAddress = async (address, accessToken) =>
  await axios.post(
    `${API_URL}/users/address`,
    { address },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
