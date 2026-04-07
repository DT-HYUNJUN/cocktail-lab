import { Typography } from "@mui/material"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined"
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { curasoBlue } from "../shared/color/color"
import styled from "styled-components"

type Path = "/" | "/cocktail" | "/ingredient"

const BottomNavbar = () => {
  const [effectPosition, setEffectPosition] = useState<{
    left: number
    width: number
  } | null>(null)
  const [pathValue, setPathValue] = useState<Path>("/")

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
            : 3

    const target = iconRefs.current[index]
    if (!target) return

    setEffectPosition({
      left: target.offsetLeft,
      width: target.offsetWidth,
    })
  }, [pathname])

  useEffect(() => {
    setPathValue(pathname as Path)
  }, [pathname])

  const handleClickIcon = (path: Path) => {
    navigate(path)
  }

  return (
    <Nav>
      {effectPosition && (
        <EffectBox left={effectPosition.left} width={effectPosition.width} />
      )}

      <PathBox
        onClick={() => handleClickIcon("/")}
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
        onClick={() => handleClickIcon("/cocktail")}
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
        onClick={() => handleClickIcon("/ingredient")}
        ref={el => (iconRefs.current[2] = el)}
      >
        <LiquorOutlinedIcon sx={{ fontSize: 24 }} />
        <Typography
          variant="caption"
          color={pathValue === "/ingredient" ? "black" : "grey"}
        >
          재료
        </Typography>
      </PathBox>
    </Nav>
  )
}

export default BottomNavbar

const Nav = styled("footer")`
  width: 234px;
  height: 52px;
  box-sizing: border-box;
  position: fixed;
  background-color: white;
  bottom: 15px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px;
  border-radius: 6.25rem;

  /* 태블릿 */
  @media (min-width: 768px) {
    display: none;
  }

  /* PC */
  @media (min-width: 1024px) {
    display: none;
  }
`

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
