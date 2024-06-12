import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import axios from "axios"
import { useState } from "react"

import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { signIn } from "../../features/auth/authSlice"
import { base_url } from "../../App"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [checkName, setCheckName] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleClickCheckName = async () => {
    setIsClicked(true)
    try {
      const response = await axios.get(base_url + `/checkname/${displayName}`)
      setCheckName(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const signUpResponse = await axios.post(base_url + "/signup", {
        username,
        password,
        displayName,
      })
      if (signUpResponse.status === 201) {
        const signInResponse = await axios.post(base_url + "/signin", {
          username,
          password,
        })

        const token = signInResponse.data

        if (token && signInResponse.status === 201) {
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
          navigate("/")
        } else {
          console.log("SignUp Failed")
        }
      }
    } catch (error) {
      console.log("SignUp Error : ", error)
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box display="flex" alignItems="start" width="100%" gap={1}>
          <TextField
            fullWidth
            onChange={e => setDisplayName(e.target.value)}
            value={displayName}
            label="닉네임"
            variant="outlined"
            type="text"
            size="small"
            error={checkName}
            disabled={isClicked && !checkName}
            helperText={
              isClicked &&
              (checkName ? "중복된 이름입니다." : "사용 가능한 이름입니다.")
            }
            required
          />
          <Button
            onClick={handleClickCheckName}
            sx={{ padding: "7px 2px" }}
            variant="outlined"
            disabled={isClicked && !checkName}
          >
            중복확인
          </Button>
        </Box>

        <TextField
          margin="normal"
          fullWidth
          onChange={e => setUsername(e.target.value)}
          value={username}
          label="아이디"
          variant="outlined"
          type="text"
          size="small"
          required
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
          required
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, color: "white" }}
        >
          회원가입
        </Button>
        <Box>
          계정이 이미 있으신가요?
          <Link
            style={{ textDecoration: "none", marginLeft: "14px" }}
            to={"/signin"}
          >
            로그인
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
