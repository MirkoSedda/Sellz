import axios from "axios"
import { API_URL } from "../costants"

export const getCategories = async () =>
  await axios.get(`${API_URL}/categories`)

export const getCategory = async slug =>
  await axios.get(`${API_URL}/categories/${slug}`)

export const deleteCategory = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/categories/${slug}`, {
    headers: { accessToken },
  })

export const updateCategory = async (slug, accessToken) =>
  await axios.put(`${API_URL}/categories/${slug}`, {
    headers: { accessToken },
  })

export const newCategory = async (category, accessToken) =>
  await axios.post(`${API_URL}/categories`, category, {
    headers: { accessToken },
  })
