import { initialState } from "../store"

export function searchReducer(state = { text: "" }, action) {
  const { type, payload } = action
  switch (type) {
    case "SEARCH_QUERY":
      return { ...state, ...action.payload }
    default:
      return state
  }
}
