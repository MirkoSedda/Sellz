import { initialState } from "../store"

export function userReducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case "LOGIN":
      return payload
    case "LOGOUT":
      return payload
    default:
      return state
  }
}
