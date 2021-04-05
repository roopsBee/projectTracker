import { createAsyncThunk } from "@reduxjs/toolkit"
import firebase from "gatsby-plugin-firebase"
import axios from "axios"

const login = createAsyncThunk(
  "users/login",
  async ({ email, password }: { email: string; password: string }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
    const userIdToken = await firebase.auth().currentUser?.getIdToken(true)
    const { data } = await axios.post("/.netlify/functions/user-login", {
      userIdToken,
    })

    const { secret, userName, userId } = data
    const user = { userName, secret, userId, email }
    localStorage.setItem("user", JSON.stringify(user))

    return user
  }
)

export default login
