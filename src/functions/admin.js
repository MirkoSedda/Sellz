import axios from "axios"
import { API_URL } from "../costants"

export const getOrders = async accessToken =>
  await axios.get(`${API_URL}/admins/orders`, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const changeOrderStatus = async (orderId, orderStatus, accessToken) =>
  await axios.put(
    `${API_URL}/admins/order-status`,
    { orderId, orderStatus },
    {
      headers: {
        authorization: accessToken,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    }
  )
