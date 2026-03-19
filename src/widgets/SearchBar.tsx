import { styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import type { RefObject } from "react"

interface SearchBarProps {
  inputRef?: RefObject<HTMLInputElement>
  inputValue: string
  handleInputSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitSearch?: (e: React.ChangeEvent<HTMLFormElement>) => void
  handleClearSearch?: () => void
  placeholder: string
  isClearButton?: boolean
}

const SearchBar = ({
  inputRef,
  inputValue,
  handleInputSearch,
  handleSubmitSearch,
  handleClearSearch,
  placeholder,
  isClearButton = false,
}: SearchBarProps) => {
  return (
    <SearchForm onSubmit={handleSubmitSearch}>
      <SearchIcon color="action" fontSize="small" />
      <SearchInput
        ref={inputRef}
        value={inputValue}
        onChange={handleInputSearch}
        type="text"
        placeholder={placeholder}
      />
      {isClearButton && inputValue && (
        <ClearButton fontSize="small" onClick={handleClearSearch} />
      )}
    </SearchForm>
  )
}

export default SearchBar

const SearchForm = styled("form")({
  width: "calc(100% - 30px)",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  padding: 10,
})

const SearchInput = styled("input")({
  background: "none",
  border: 0,
  outline: "none",
  fontWeight: "bold",
  width: "100%",
})

const ClearButton = styled(HighlightOffIcon)({
  cursor: "pointer",
})
