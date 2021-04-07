import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice/userSlice"
import projectReducer from "./projectSlice/projectSlice"

const store = configureStore({
  reducer: { user: userReducer, projectState: projectReducer },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
