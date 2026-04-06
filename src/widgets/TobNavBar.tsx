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
  width: 100%;
  height: 40px;
  background-color: ${backgroundColor};
  display: flex;
  gap: 12px;
  align-items: center;
  z-index: 1000;
  padding-top: 4px;
  padding-left: 24px;
  padding-right: 24px;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    display: none;
  }

  /* @media (min-width: 1024px) {
    display: none;
  } */
`

const LeftBox = styled("div")({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
})

const CenterBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
  alignItems: "center",
})

const RightBox = styled("div")({
  display: "flex",
  justifyContent: "end",
  alignItems: "center",
})
