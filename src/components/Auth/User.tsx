import { Box, Container, Typography } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { useNavigate } from "react-router-dom"

const User = () => {
  const user = useAppSelector((state: RootState) => state.auth.user)

  const navigate = useNavigate()

  const handleClickProfile = () => {
    navigate("/profile")
  }

  return (
    <Container sx={{ marginBottom: 4 }}>
      <Box
        sx={{ cursor: "pointer" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        onClick={handleClickProfile}
      >
        <Box component="div" display="flex" alignItems="center">
          <Typography color="primary">{user.displayName}</Typography>
          <KeyboardArrowRightIcon />
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="caption">나만의 레시피</Typography>
          <Typography variant="button">0</Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default User
