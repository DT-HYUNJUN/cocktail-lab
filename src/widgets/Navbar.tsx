import { useNavigate } from "react-router-dom"
import { Box, styled } from "@mui/material"
import { useState } from "react"
import SearchBar from "./SearchBar"
import { useCocktailStore } from "../app/store"

const Navbar = () => {
  const [searchInput, setSearchInput] = useState("")

  const updateSearchValue = useCocktailStore(state => state.updateSearchValue)

  const navigate = useNavigate()

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSearchValue(searchInput)
    navigate(`/search/${searchInput}`)
  }

  return (
    <NavBox>
      <Box component="div" display="flex" justifyContent="center" flexGrow={1}>
        <SearchBar
          inputValue={searchInput}
          handleInputSearch={handleInputSearch}
          handleSubmitSearch={handleSubmitSearch}
          placeholder="칵테일 또는 재료를 검색해보세요."
        />
      </Box>
    </NavBox>
  )
}

export default Navbar

const NavBox = styled(Box)({
  maxWidth: "640px",
  boxSizing: "border-box",
  position: "fixed",
  backgroundColor: "white",
  top: 0,
  left: 0,
  right: 0,
  margin: "0 auto",
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  padding: "4px",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 6px",
  marginBottom: "40px",
})
