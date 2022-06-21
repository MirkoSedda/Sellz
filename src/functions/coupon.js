import axios from "axios"
import { API_URL } from "../costants"

export const createCoupon = async (coupon, accessToken) =>
  await axios.post(
    `${API_URL}/coupons`,
    { coupon },
    {
      headers: {
        authorization: accessToken,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    }
  )

export const getCoupons = async () => await axios.get(`${API_URL}/coupons`)

export const removeCoupon = async (couponId, accessToken) =>
  await axios.delete(`${API_URL}/coupons/${couponId}`, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })
