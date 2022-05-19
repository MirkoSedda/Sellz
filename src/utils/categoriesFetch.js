import axios from "axios"
import { BE_CATEGORIES_URL } from "../constants"

export const getCategories = async () => await axios.get(`${BE_CATEGORIES_URL}`)

export const getCategory = async slug =>
  await axios.get(`${BE_CATEGORIES_URL}/${slug}`)

export const deleteCategory = async (slug, accessToken) =>
  await axios.delete(`${BE_CATEGORIES_URL}/${slug}`, {
    headers: { accessToken },
  })

export const updateCategory = async (slug, category, accessToken) =>
  await axios.put(`${BE_CATEGORIES_URL}/${slug}`, {
    headers: { accessToken },
  })

export const newCategory = async (category, accessToken) =>
  await axios.put(`${BE_CATEGORIES_URL}/category`, category, {
    headers: { accessToken },
  })
