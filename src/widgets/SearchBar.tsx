import { styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

interface SearchBarProps {
  inputValue: string
  handleInputSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitSearch: (e: React.ChangeEvent<HTMLFormElement>) => void
  placeholder: string
}

const SearchBar = ({
  inputValue,
  handleInputSearch,
  handleSubmitSearch,
  placeholder,
}: SearchBarProps) => {
  return (
    <SearchForm onSubmit={handleSubmitSearch}>
      <SearchIcon color="action" fontSize="small" />
      <SearchInput
        value={inputValue}
        onChange={handleInputSearch}
        type="text"
        placeholder={placeholder}
      />
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
