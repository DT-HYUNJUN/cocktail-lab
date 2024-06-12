import { createSlice } from "@reduxjs/toolkit"

interface IUser {
  id: string
  username: string
  displayName: string
}

const initialUser: IUser = {
  id: "",
  username: "",
  displayName: "",
}

export interface AuthSliceState {
  user: IUser
  token: string | null
  isLoggedIn: boolean
}

const initialState: AuthSliceState = {
  user: initialUser,
  token: null,
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isLoggedIn = true
    },
    signOut(state) {
      state.user = initialUser
      state.token = null
      state.isLoggedIn = false
    },
    updateUser(state, action) {
      state.user.displayName = action.payload.displayName
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

export const { signIn, signOut, setIsLoggedIn, updateUser } = authSlice.actions
export default authSlice.reducer
