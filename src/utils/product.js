import axios from "axios"
import { API_URL } from "../costants"

export const newProduct = async (product, accessToken) =>
  await axios.post(`${API_URL}/products`, product, {
    headers: {
      authorization: accessToken,
    },
  })
