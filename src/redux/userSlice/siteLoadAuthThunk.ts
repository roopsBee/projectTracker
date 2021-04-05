import { initialState } from "./userSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"

const siteLoadAuth = createAsyncThunk("users/siteLoadAuth", async () => {
  const userStr = localStorage.getItem("user")
  if (userStr) {
    const user = JSON.parse(userStr)
    console.log({ user })
    const { userName, secret, email, userId } = user
    if (userName && secret && email && userId) {
      return { ...user, isLoggedIn: true }
    }
    return initialState
  }
})

export default siteLoadAuth
