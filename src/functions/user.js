import axios from "axios"
import { API_URL } from "../costants"

import { toastInfo, toastError } from "./toastNotification"
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
    toastInfo("Thanks for registering")
    return { _id }
  } catch (error) {
    toastError(`Error registering user: ${error}`)
    console.log(error)
  }
}
export const userCart = async (cart, accessToken) =>
  await axios.post(
    `${API_URL}/users/cart`,
    { cart },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
export const getUserCart = async accessToken =>
  await axios.get(`${API_URL}/users/cart`, {
    headers: {
      authorization: accessToken,
    },
  })

export const emptyUserCart = async accessToken =>
  await axios.delete(`${API_URL}/users/cart`, {
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
export const applyCoupon = async (coupon, accessToken) =>
  await axios.post(
    `${API_URL}/users/cart/coupon`,
    { coupon },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
export const createOrder = async (stripeResponse, accessToken) =>
  await axios.post(
    `${API_URL}/users/order`,
    { stripeResponse },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
export const getUserOrders = async accessToken =>
  await axios.get(`${API_URL}/users/orders`, {
    headers: {
      authorization: accessToken,
    },
  })

export const getWishlist = async accessToken =>
  await axios.get(`${API_URL}/users/wishlist`, {
    headers: {
      authorization: accessToken,
    },
  })

export const removeFromWishlist = async (productId, accessToken) =>
  await axios.put(
    `${API_URL}/users/wishlist/${productId}`,
    {},
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
export const addToWishlist = async (productId, accessToken) =>
  await axios.post(
    `${API_URL}/users/wishlist`,
    { productId },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
export const createCashOrder = async (
  accessToken,
  CashOnDelivery,
  validCoupon
) =>
  await axios.post(
    `${API_URL}/users/cash-order`,
    { couponApplied: validCoupon, CashOnDelivery },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
