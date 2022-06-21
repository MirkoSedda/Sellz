import axios from "axios"
import { API_URL } from "../costants"

export const getSubcategories = async p =>
  await axios.get(`${API_URL}/subcategories/${p}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getSubCategories = async () =>
  await axios.get(`${API_URL}/subcategories`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const getSubCategory = async slug =>
  await axios.get(`${API_URL}/subcategories/${slug}`, {
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const deleteSubCategory = async (slug, accessToken) =>
  await axios.delete(`${API_URL}/subcategories/${slug}`, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const updateSubCategory = async (slug, subcategory, accessToken) =>
  await axios.put(`${API_URL}/subcategories/${slug}`, subcategory, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })

export const newSubCategory = async (subcategory, accessToken) =>
  await axios.post(`${API_URL}/subcategories`, subcategory, {
    headers: {
      authorization: accessToken,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  })
