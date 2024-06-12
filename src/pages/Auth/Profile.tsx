import { Box, Button, Container } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useNavigate } from "react-router-dom"
import { signOut } from "../../features/auth/authSlice"
import type { RootState } from "../../app/store"
import axios from "axios"
import ProfileInfo from "../../components/Auth/ProfileInfo"
import { useState } from "react"
import DeleteModal from "../../components/Common/DeleteModal"
import { base_url } from "../../App"

const Profile = () => {
  const [open, setOpen] = useState(false)

  const uid = useAppSelector((state: RootState) => state.auth.user.id)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleSignOut = () => {
    dispatch(signOut())
    navigate("/")
  }

  const deleteUser = async () => {
    await axios.delete(base_url + `/${uid}`)
    dispatch(signOut())
    navigate("/")
  }
  return (
    <Container>
      <ProfileInfo />
      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <Button
          sx={{ width: "100px" }}
          onClick={handleSignOut}
          color="warning"
          variant="outlined"
        >
          로그아웃
        </Button>
        <Button
          sx={{ width: "100px" }}
          onClick={handleOpen}
          color="error"
          variant="outlined"
        >
          탈퇴
        </Button>
      </Box>
      <DeleteModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        deleteUser={deleteUser}
      />
    </Container>
  )
}

export default Profile
