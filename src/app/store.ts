/// <reference types="redux-persist/types" />
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import cocktailReducer from "../features/cocktail/cocktailSlice"
import authReducer from "../features/auth/authSlice"
import storage from "redux-persist/lib/storage"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist"

const rootReducer = combineReducers({
  cocktail: cocktailReducer,
  auth: authReducer,
})

const persistConfig = {
  key: "root",
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
