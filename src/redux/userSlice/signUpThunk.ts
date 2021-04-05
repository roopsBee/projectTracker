import { createAsyncThunk } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"

const signUp = createAsyncThunk(
  "users/signUp",
  async ({
    email,
    password,
    userName,
  }: {
    email: string
    password: string
    userName: string
  }) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    const userIdToken = await firebase.auth().currentUser?.getIdToken(true)
    const { data } = await axios.post("/.netlify/functions/user-create-login", {
      userIdToken,
      userName,
    })

    const { secret, userId } = data
    const user = { userName, secret, userId, email }
    localStorage.setItem("user", JSON.stringify(user))

    return user
  }
)

export default signUp
