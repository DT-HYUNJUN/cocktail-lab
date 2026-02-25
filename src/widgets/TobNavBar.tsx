import styled from "styled-components"
import type { ComponentType } from "react"

interface TopNavBarProps {
  left?: ComponentType
  center?: ComponentType
  right?: ComponentType
}

const TobNavBar = ({
  left: Left,
  center: Center,
  right: Right,
}: TopNavBarProps) => {
  return (
    <Header>
      <LeftBox>{Left && <Left />}</LeftBox>
      <CenterBox>{Center && <Center />}</CenterBox>
      <RightBox>{Right && <Right />}</RightBox>
    </Header>
  )
}

export default TobNavBar

const Header = styled("header")({
  boxSizing: "border-box",
  position: "fixed",
  top: 0,
  width: 480,
  height: 48,
  backgroundColor: "oklch(0.99 0 0)",
  display: "flex",
  gap: 24,
  alignItems: "center",
  zIndex: 1000,
  paddingLeft: 24,
  paddingRight: 24,
  // borderBottom: "1px solid black",
})

const LeftBox = styled("div")({
  display: "flex",
  justifyContent: "start",
})

const CenterBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
})

const RightBox = styled("div")({
  display: "flex",
  justifyContent: "end",
})
