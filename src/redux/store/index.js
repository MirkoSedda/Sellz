import { createStore, combineReducers, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { persistReducer, persistStore } from "redux-persist"
import localStorage from "redux-persist/lib/storage"
import { encryptTransform } from "redux-persist-transform-encrypt"
import { SECRET_KEY } from "../../costants"
import { userReducer } from "../reducers/userReducer"
import { searchReducer } from "../reducers/searchReducer"
import { cartReducer } from "../reducers/cartReducer"

export const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
})

const persistConfig = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: SECRET_KEY,
      onError: error => {
        console.log(error)
      },
    }),
  ],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
