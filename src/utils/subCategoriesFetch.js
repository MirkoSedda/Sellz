import axios from "axios"
import { API_URL } from "../costants"

export const getSubCategories = async () =>
  await axios.get(`${API_URL}/subcategories`)

export const getSubCategory = async slug =>
  await axios.get(`${API_URL}/subcategories/${slug}`)

export const deleteSubCategory = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/subcategories/${slug}`, {
    headers: {
      authorization: accessToken,
    },
  })

export const updateSubCategory = async (slug, subcategory, accessToken) =>
  await axios.put(`${API_URL}/subcategories/${slug}`, subcategory, {
    headers: {
      authorization: accessToken,
    },
  })

export const newSubCategory = async (subcategory, accessToken) =>
  await axios.post(`${API_URL}/subcategories`, subcategory, {
    headers: {
      authorization: accessToken,
    },
  })
