import { createAsyncThunk } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"
import { AppDispatch } from "../store"
import getProjectListThunk from "../projectSlice/getProjectListThunk"
import { UserState } from "./userSlice"

const login = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { dispatch: AppDispatch }
>("users/login", async ({ email, password }, { dispatch }) => {
  await firebase.auth().signInWithEmailAndPassword(email, password)
  const userIdToken = await firebase.auth().currentUser?.getIdToken(true)
  const { data } = await axios.post("/.netlify/functions/user-login", {
    userIdToken,
  })

  const { secret, userName, userId } = data
  const user = { userName, secret, userId, email }
  localStorage.setItem("user", JSON.stringify(user))
  await dispatch(getProjectListThunk({ userId, secret }))
  return user
})

export default login
