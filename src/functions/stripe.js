import axios from "axios"
import { API_URL } from "../costants"

export const createPaymentIntent = (coupon, accessToken) =>
  axios.post(
    `${API_URL}/stripe/create-payment-intent`,
    { couponApplied: coupon },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )
