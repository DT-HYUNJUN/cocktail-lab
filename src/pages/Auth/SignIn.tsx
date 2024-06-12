import axios from "axios"
import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"
import { setIsLoggedIn, signIn } from "../../features/auth/authSlice"
import { Link, useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { base_url } from "../../App"

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [checked, setChecked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    localStorage.setItem("remember-auth", checked === true ? "false" : "true")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(base_url + "/signin", {
        username,
        password,
      })

      const token = response.data

      if (token && response.status === 201) {
        localStorage.setItem("token", token)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        const response = await axios.get(base_url + "/status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch(
          signIn({
            user: {
              id: response.data._id,
              username: response.data.username,
              displayName: response.data.displayName,
            },
            token,
            isLoggedIn: true,
          }),
        )
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        navigate("/")
      } else {
        console.log("Login Failed")
      }
    } catch (error) {
      console.log("Login Error : ", error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          fullWidth
          onChange={e => setUsername(e.target.value)}
          value={username}
          label="아이디"
          variant="outlined"
          type="text"
          size="small"
        />
        <TextField
          margin="normal"
          id="password"
          fullWidth
          onChange={e => setPassword(e.target.value)}
          value={password}
          label="패스워드"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          size="small"
        />
        <FormControlLabel
          sx={{ alignSelf: "start" }}
          control={
            <Checkbox checked={checked} onChange={handleClickCheckbox} />
          }
          label="로그인 상태 유지"
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "white" }}
        >
          로그인
        </Button>
        <Box>
          계정이 없으신가요?
          <Link
            style={{ textDecoration: "none", marginLeft: "14px" }}
            to={"/signup"}
          >
            회원 가입
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default SignIn
