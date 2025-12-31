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

const BottomNavbar = () => {
  const [pathValue, setPathValue] = useState("")
  const { pathname } = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    setPathValue(pathname)
  }, [pathname])

  const handleClickIcon = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <Nav>
      <PathBox
        onClick={() => handleClickIcon("")}
        bgcolor={pathValue === "/" ? "rgba(0, 206, 209, 0.4)" : "none"}
      >
        <HomeOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue === "/" ? "black" : "grey"}
        >
          홈
        </Typography>
      </PathBox>
      <PathBox
        onClick={() => handleClickIcon("cocktail")}
        bgcolor={
          pathValue.includes("/cocktail") ? "rgba(0, 206, 209, 0.4)" : "none"
        }
      >
        <LocalBarOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue.includes("/cocktail") ? "black" : "grey"}
        >
          칵테일
        </Typography>
      </PathBox>
      <PathBox
        onClick={() => handleClickIcon("ingredient")}
        bgcolor={
          pathValue.includes("/ingredient") ? "rgba(0, 206, 209, 0.4)" : "none"
        }
      >
        <LiquorOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue.includes("/ingredient") ? "black" : "grey"}
        >
          재료
        </Typography>
      </PathBox>
      <PathBox
        onClick={() => handleClickIcon("mybar")}
        bgcolor={pathValue === "/mybar" ? "rgba(0, 206, 209, 0.4)" : "none"}
      >
        <AccountCircleOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue === "/mybar" ? "black" : "grey"}
        >
          마이 바
        </Typography>
      </PathBox>
    </Nav>
  )
}

export default BottomNavbar

const Nav = styled(Box)({
  width: 314,
  boxSizing: "border-box",
  position: "fixed",
  backgroundColor: "white",
  bottom: 15,
  left: 0,
  right: 0,
  margin: "0 auto",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 3,
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
  borderRadius: "6.25rem",
})

const PathBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "6.25rem",
  width: 78,
  paddingTop: 2,
  paddingBottom: 2,
})
