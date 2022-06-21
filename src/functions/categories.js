import axios from "axios"
import { API_URL } from "../costants"

export const getCategories = async () =>
  await axios.get(`${API_URL}/categories`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getCategory = async slug =>
  await axios.get(`${API_URL}/categories/${slug}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const deleteCategory = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/categories/${slug}`, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const updateCategory = async (slug, category, accessToken) =>
  await axios.put(`${API_URL}/categories/${slug}`, category, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const newCategory = async (category, accessToken) =>
  await axios.post(`${API_URL}/categories`, category, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getSubCategoriesBasedOnCategory = async _id =>
  await axios.get(`${API_URL}/categories/subcategories/${_id}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })
