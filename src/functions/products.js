import axios from "axios"
import { API_URL } from "../costants"

export const getProduct = async slug =>
  await axios.get(`${API_URL}/products/${slug}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getProducts = async () =>
  await axios.get(`${API_URL}/products/`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getProductsByLimit = async limit =>
  await axios.get(`${API_URL}/products/limit/${limit}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getRelatedProducts = async productId =>
  await axios.get(`${API_URL}/products/related/${productId}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getProductsByParams = async (sort, order) =>
  await axios.post(
    `${API_URL}/products/sort-order`,
    {
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    },
    {
      sort,
      order,
    }
  )

export const getProductsByFilter = async query =>
  await axios.post(
    `${API_URL}/products/search&filters`,
    {
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    },
    query
  )

export const getProductsCountTotal = async () =>
  await axios.get(`${API_URL}/products/total-number-of-products`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const newProduct = async (product, accessToken) =>
  await axios.post(`${API_URL}/products`, product, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const updateProduct = async (slug, product, accessToken) =>
  await axios.put(`${API_URL}/products/${slug}`, product, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const productRating = async (userId, productId, star, accessToken) =>
  await axios.put(
    `${API_URL}/products/rating/${userId}/${productId}`,
    { star },
    {
      headers: {
        authorization: accessToken,
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    }
  )

export const removeProduct = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/products/${slug}`, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })
