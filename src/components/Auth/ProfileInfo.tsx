import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Typography,
  styled,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"
import { useState } from "react"
import axios from "axios"
import { base_url } from "../../App"
import { updateUser } from "../../features/auth/authSlice"

const ProfileInfo = () => {
  const user = useAppSelector((state: RootState) => state.auth.user)

  const [updatedName, setUpdatedName] = useState(user.displayName)
  const [isEdit, setIsEdit] = useState(false)

  const dispatch = useAppDispatch()

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleUpdate = async () => {
    await axios.patch(base_url + `/${user.id}`, { displayName: updatedName })
    dispatch(updateUser({ displayName: updatedName }))
    setIsEdit(false)
  }

  return (
    <Container disableGutters>
      <Typography>회원정보</Typography>
      <Divider sx={{ m: "8px 0" }} />
      <Box display="flex" gap={3}>
        <Box display="flex" flexDirection="column" gap={0.5}>
          <ProfileInfoTypo>닉네임</ProfileInfoTypo>
          <ProfileInfoTypo>아이디</ProfileInfoTypo>

          <ProfileInfoTypo>비밀번호</ProfileInfoTypo>
        </Box>
        <Box display="flex" flexDirection="column" gap={0.5}>
          {isEdit ? (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <NameInput
                value={updatedName}
                onChange={e => setUpdatedName(e.target.value)}
              />
              <Button sx={{ p: 0 }} size="small" onClick={handleUpdate}>
                저장
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={2}>
              <Typography>{user.displayName}</Typography>
              <IconButton
                disableRipple
                sx={{ p: 0 }}
                size="small"
                onClick={handleEdit}
              >
                <EditIcon fontSize="inherit" color="info" />
              </IconButton>
            </Box>
          )}

          <Typography>{user.username}</Typography>
          <Typography>******</Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default ProfileInfo

const ProfileInfoTypo = styled(Typography)({
  color: "#bdbdbd",
})

const NameInput = styled("input")({
  border: 0,
  borderBottom: "1px solid black",
  padding: 0,
  height: "100%",
  "&:focus": {
    outline: 0,
  },
})
