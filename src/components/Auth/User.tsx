import { Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { signOut } from "../../features/auth/authSlice"
import axios from "axios"
import type { RootState } from "../../app/store"

const base_url = "http://localhost:3000/auth"

const User = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const uid = useAppSelector((state: RootState) => state.auth.user.id)

  const handleSignOut = () => {
    dispatch(signOut())
    navigate("/")
  }

  const handleUpdateUser = () => {}

  const deleteUser = async () => {
    await axios.delete(base_url + `/${uid}`)
    dispatch(signOut())
    navigate("/")
  }

  return (
    <div>
      <Button onClick={handleSignOut} variant="outlined">
        로그아웃
      </Button>
      <Button onClick={deleteUser} color="error" variant="outlined">
        탈퇴
      </Button>
    </div>
  )
}

export default User
