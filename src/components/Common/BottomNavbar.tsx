import { Box, Typography, styled } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LocalBarIcon from "@mui/icons-material/LocalBar"
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined"
import LiquorIcon from "@mui/icons-material/Liquor"
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"

const BottomNavbar = () => {
  const [pathValue, setPathValue] = useState("")

  const isLoggedIn = useAppSelector((state: RootState) => state.auth.isLoggedIn)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setPathValue(pathname)
  }, [pathname])

  const handleClickIcon = (path: string) => {
    navigate(`/${path}`)
  }

  const handleClickMyBar = (path: string) => {
    if (isLoggedIn === false) navigate("/signin")
    else navigate(`/${path}`)
  }

  return (
    <Nav>
      <PathBox onClick={() => handleClickIcon("")}>
        {pathValue === "/" ? (
          <HomeIcon sx={{ fontSize: "24px" }} color="primary" />
        ) : (
          <HomeOutlinedIcon sx={{ fontSize: "24px" }} />
        )}
        <Typography
          variant="caption"
          color={pathValue === "/" ? "primary" : "none"}
        >
          홈
        </Typography>
      </PathBox>
      <PathBox onClick={() => handleClickIcon("cocktail")}>
        {pathValue.includes("/cocktail") ? (
          <LocalBarIcon sx={{ fontSize: "24px" }} color="primary" />
        ) : (
          <LocalBarOutlinedIcon sx={{ fontSize: "24px" }} />
        )}
        <Typography
          variant="caption"
          color={pathValue.includes("/cocktail") ? "primary" : "none"}
        >
          칵테일
        </Typography>
      </PathBox>
      <PathBox onClick={() => handleClickIcon("ingredient")}>
        {pathValue.includes("/ingredient") ? (
          <LiquorIcon sx={{ fontSize: "24px" }} color="primary" />
        ) : (
          <LiquorOutlinedIcon sx={{ fontSize: "24px" }} />
        )}
        <Typography
          variant="caption"
          color={pathValue.includes("/ingredient") ? "primary" : "none"}
        >
          재료
        </Typography>
      </PathBox>
      <PathBox onClick={() => handleClickMyBar("mybar")}>
        {pathValue === "/mybar" || pathValue.includes("sign") ? (
          <AccountCircleIcon sx={{ fontSize: "24px" }} color="primary" />
        ) : (
          <AccountCircleOutlinedIcon sx={{ fontSize: "24px" }} />
        )}
        <Typography
          variant="caption"
          color={
            pathValue === "/mybar" || pathValue.includes("sign")
              ? "primary"
              : "none"
          }
        >
          마이 바
        </Typography>
      </PathBox>
    </Nav>
  )
}

export default BottomNavbar

const Nav = styled(Box)({
  maxWidth: "430px",
  boxSizing: "border-box",
  position: "fixed",
  backgroundColor: "white",
  bottom: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  zIndex: 100,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 40px",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
})

const PathBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
})
