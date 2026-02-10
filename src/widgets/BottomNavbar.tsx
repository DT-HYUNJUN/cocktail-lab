import { Box, Typography, styled } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined"
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { curasoBlue } from "../shared/color/color"

const BottomNavbar = () => {
  const [effectPosition, setEffectPositino] = useState<{
    left: number
    width: number
  } | null>(null)
  const [pathValue, setPathValue] = useState("")

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const iconRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const index =
      pathname === "/"
        ? 0
        : pathname.startsWith("/cocktail")
          ? 1
          : pathname.startsWith("/ingredient")
            ? 2
            : pathname.startsWith("/mybar")
              ? 3
              : 0

    const target = iconRefs.current[index]
    if (!target) return

    setEffectPositino({
      left: target.offsetLeft,
      width: target.offsetWidth,
    })
  }, [pathname])

  useEffect(() => {
    setPathValue(pathname)
  }, [pathname])

  const handleClickIcon = (path: string) => {
    navigate(`/${path}`)
  }

  return (
    <Nav>
      {effectPosition && (
        <EffectBox left={effectPosition.left} width={effectPosition.width} />
      )}

      <PathBox
        onClick={() => handleClickIcon("")}
        ref={el => (iconRefs.current[0] = el)}
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
        ref={el => (iconRefs.current[1] = el)}
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
        ref={el => (iconRefs.current[2] = el)}
      >
        <SearchOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue.includes("/ingredient") ? "black" : "grey"}
        >
          검색
        </Typography>
      </PathBox>
      <PathBox
        onClick={() => handleClickIcon("mybar")}
        ref={el => (iconRefs.current[3] = el)}
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
  height: 52,
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
  padding: 4,
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
  borderRadius: "6.25rem",
})

const PathBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "6.25rem",
  width: 80,
  height: 44,
  zIndex: 10,
})

const EffectBox = styled("div")<{
  left: number
  width: number
}>`
  position: absolute;
  background-color: ${curasoBlue[50]};
  width: 80px;
  height: 46px;
  border-radius: 6.25rem;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  transition:
    left 300ms ease,
    width 300ms ease;
`
