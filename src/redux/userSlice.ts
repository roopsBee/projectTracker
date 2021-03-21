import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
  secret?: string | null
  userId?: {} | null
  email?: string | null
  userName?: string | null
}

const initialState: UserState = {
  secret: null,
  userId: null,
  email: null,
  userName: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      const {
        payload: { email, secret, userId, userName },
      } = action
      state.secret = secret
      state.email = email
      state.userId = userId
      state.userName = userName
    },
  },
})

export const { login } = userSlice.actions

export default userSlice.reducer
