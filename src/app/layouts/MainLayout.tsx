import { Outlet, useLocation, useNavigate } from "react-router-dom"
import TobNavBar from "../../widgets/TobNavBar"
import BottomNavbar from "../../widgets/BottomNavbar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import styled from "styled-components"
import SearchBar from "../../widgets/SearchBar"
import { type ChangeEvent, useRef, useState } from "react"
import { useRecentSearchStore } from "../store"

/**
 * TODO:
 * HOME
 * - 최근 본 칵테일 리스트
 * - TopNav 홈 텍스트 변경
 * - 랜덤 카드 chip 클릭 비활성
 */

const BackButton = () => {
  const navigate = useNavigate()

  const handleClickBack = () => {
    navigate(-1)
  }

  return (
    <ButtonBox onClick={handleClickBack}>
      <ArrowBackIcon fontSize="small" />
    </ButtonBox>
  )
}

const HomeButton = () => {
  return <div>홈</div>
}

const MyButton = () => {
  const navigate = useNavigate()

  const handleClickMy = () => {
    navigate("/mybar")
  }

  return (
    <ButtonBox onClick={handleClickMy}>
      <AccountCircleOutlinedIcon />
    </ButtonBox>
  )
}

const SearchSection = () => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState("")

  const addRecentSearchValueList = useRecentSearchStore(
    state => state.addRecentSearchValueList,
  )

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    addRecentSearchValueList(value)
    navigate(`/search/${value}`)
  }

  const handleClear = () => {
    setValue("")
    inputRef.current && inputRef.current.focus()
  }

  return (
    <SearchBar
      inputRef={inputRef}
      inputValue={value}
      handleInputSearch={e => setValue(e.target.value)}
      handleSubmitSearch={handleSubmit}
      placeholder="검색어를 입력하세요"
      isClearButton={true}
      handleClearSearch={handleClear}
    />
  )
}

const Blank = () => {
  return <></>
}

const MainLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === "/"
  const isSearch = location.pathname.includes("/search")

  return (
    <>
      <TobNavBar
        left={isHome ? HomeButton : BackButton}
        center={isSearch ? SearchSection : Blank}
        right={MyButton}
      />
      <Outlet />
      <BottomNavbar />
    </>
  )
}

export default MainLayout

const ButtonBox = styled("div")({
  cursor: "pointer",
})
