import styled from "styled-components"
import type { ComponentType } from "react"
import { backgroundColor } from "../shared/color/color"

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

const Header = styled.header`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  width: 480px;
  height: 48px;
  background-color: ${backgroundColor};
  display: flex;
  gap: 24px;
  align-items: center;
  z-index: 1000;
  padding-left: 24px;
  padding-right: 24px;
  @media (max-width: 480px) {
    width: 100%;
  }
`

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
