import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import projectReducer from "./projectSlice"

const store = configureStore({
  reducer: { user: userReducer, projects: projectReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
