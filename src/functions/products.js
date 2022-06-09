import axios from "axios"
import { API_URL } from "../costants"

export const getProduct = async slug =>
  await axios.get(`${API_URL}/products/${slug}`)

export const getProducts = async () => await axios.get(`${API_URL}/products/`)

export const getProductsByLimit = async limit =>
  await axios.get(`${API_URL}/products/limit/${limit}`)

export const getRelatedProducts = async productId =>
  await axios.get(`${API_URL}/products/related/${productId}`)

export const getProductsByParams = async (sort, order, page) =>
  await axios.post(`${API_URL}/products/sort-order-page`, {
    sort,
    order,
    page,
  })

export const getProductsByFilter = async query =>
  await axios.post(`${API_URL}/products/search/filters`, query)

export const getProductsCountTotal = async () =>
  await axios.get(`${API_URL}/products/total-number-of-products`)

export const newProduct = async (product, accessToken) =>
  await axios.post(`${API_URL}/products`, product, {
    headers: {
      authorization: accessToken,
    },
  })

export const updateProduct = async (slug, product, accessToken) =>
  await axios.put(`${API_URL}/products/${slug}`, product, {
    headers: {
      authorization: accessToken,
    },
  })

export const productRating = async (userId, productId, star, accessToken) =>
  await axios.put(
    `${API_URL}/products/rating/${userId}/${productId}`,
    { star },
    {
      headers: {
        authorization: accessToken,
      },
    }
  )

export const removeProduct = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/products/${slug}`, {
    headers: {
      authorization: accessToken,
    },
  })
