import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice/userSlice"
import projectReducer from "./projectSlice/projectSlice"
import { loadState } from "./loadState"
import { saveState } from "../redux/saveState"

const persistedState = loadState()

const store = configureStore({
  reducer: { user: userReducer, projectState: projectReducer },
  preloadedState: persistedState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
