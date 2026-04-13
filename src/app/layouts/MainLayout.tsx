import { Outlet, useLocation, useNavigate } from "react-router-dom"
import TobNavBar from "../../widgets/TobNavBar"
import BottomNavbar from "../../widgets/BottomNavbar"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import styled from "styled-components"
import SearchBar from "../../widgets/SearchBar"
import { type ChangeEvent, useEffect, useRef, useState } from "react"
import { useRecentSearchStore } from "../store"
import { aperolOrange } from "../../shared/color/color"
import Logo from "../../shared/assets/icon/cocktail_lab.png"
import { Divider, Typography } from "@mui/material"
import ScrollButton from "../../widgets/ScrollButton"

const HomeButton = () => {
  return (
    <HomeButtonBox>
      <LogoIcon src={Logo} alt="cocktail_lab_logo" />
      <Typography color="primary" fontWeight={700}>
        Cocktail Lab
      </Typography>
    </HomeButtonBox>
  )
}

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

const SearchButton = () => {
  const navigate = useNavigate()

  const handleClickMy = () => {
    navigate("/search")
  }

  return (
    <ButtonBox onClick={handleClickMy}>
      <SearchOutlinedIcon />
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
  const [value, setValue] = useState("")
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()

  const updateSearchValue = useRecentSearchStore(
    state => state.updateSearchValue,
  )

  const addRecentSearchValueList = useRecentSearchStore(
    state => state.addRecentSearchValueList,
  )

  const isHome = pathname === "/"
  const isSearch = pathname.includes("/search")

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSearchValue(value)
    addRecentSearchValueList(value)
    navigate(`/search/${value}`)
  }

  const handleClickLink = (pathname: string) => {
    navigate(pathname)
  }

  const handleClear = () => {
    setValue("")
    inputRef.current && inputRef.current.focus()
  }

  useEffect(() => {
    console.log(pathname)
  }, [pathname])

  return (
    <>
      <TobNavBar
        left={isHome ? HomeButton : BackButton}
        center={isSearch ? SearchSection : Blank}
        right={SearchButton}
      />
      <WideContainer>
        <Header>
          <LogoBox onClick={() => handleClickLink("/")}>
            <LogoIcon src={Logo} alt="cocktail_lab_logo" />
            <Typography variant="h4" color="primary" fontWeight={900}>
              Cocktail Lab
            </Typography>
          </LogoBox>
          <SearchBox>
            <SearchBar
              inputRef={inputRef}
              inputValue={value}
              handleInputSearch={e => setValue(e.target.value)}
              handleSubmitSearch={handleSubmitSearch}
              placeholder="검색어를 입력하세요"
              isClearButton={true}
              handleClearSearch={handleClear}
            />
          </SearchBox>
        </Header>
        <MenuBar>
          <MenuList>
            <MenuItem>
              <MenuLink
                onClick={() => handleClickLink("/")}
                $selected={pathname === "/"}
              >
                홈
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                onClick={() => handleClickLink("/cocktail")}
                $selected={pathname.includes("/cocktail")}
              >
                칵테일
              </MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink
                onClick={() => handleClickLink("/ingredient")}
                $selected={pathname.includes("/ingredient")}
              >
                재료
              </MenuLink>
            </MenuItem>
          </MenuList>
        </MenuBar>
        <Divider />
      </WideContainer>
      <ScrollButton />
      <Outlet />
      {pathname.startsWith("/search") || <BottomNavbar />}
    </>
  )
}

export default MainLayout

const ButtonBox = styled("div")({
  cursor: "pointer",
})

const WideContainer = styled("div")`
  @media (max-width: 480px) {
    display: none;
  }

  /* 태블릿 */
  @media (min-width: 768px) {
    display: block;
    margin-bottom: 32px;
  }
`

const MenuBar = styled("div")`
  height: 30px;
  padding: 10px 0 16px;
`

const MenuList = styled("ul")`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`

const MenuItem = styled("li")`
  padding: 0 8px;
  vertical-align: top;
`

const MenuLink = styled("div")<{ $selected: boolean }>`
  cursor: pointer;
  font-weight: 500;
  padding: 8px 0 4px;
  color: ${props => (props.$selected ? aperolOrange[400] : "#000")};
  border-bottom: ${props =>
    props.$selected ? `2px solid ${aperolOrange[400]}` : "none"};
  &:hover {
    color: ${aperolOrange[400]};
    border-bottom: 2px solid ${aperolOrange[400]};
  }
`

// PC 화면
const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
  gap: 48,
})

const LogoIcon = styled("img")({
  width: 28,
  height: 28,
})

const LogoBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
})

const SearchBox = styled("div")({
  width: 400,
})

const HomeButtonBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
})
