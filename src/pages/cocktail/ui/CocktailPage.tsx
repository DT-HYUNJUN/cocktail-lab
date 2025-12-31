import { Box, Container } from "@mui/material"
import FilterCard from "../../../shared/ui/FilterCard"
import {
  Collins,
  Highball,
  Hurricane,
  Margarita,
  Martini,
  Old,
  Rum,
  Gin,
  Vodka,
  Whiskey,
  Tequila,
  Brandy,
} from "../assets"

const spiritList = [
  { value: "rum", filterValue: "럼", image: Rum },
  { value: "gin", filterValue: "진", image: Gin },
  { value: "vodka", filterValue: "보드카", image: Vodka },
  { value: "scotch", filterValue: "위스키", image: Whiskey },
  { value: "tequila", filterValue: "데킬라", image: Tequila },
  { value: "brandy", filterValue: "브랜디", image: Brandy },
]

const glassList = [
  {
    value: "highball_glass",
    filterValue: "하이볼",
    image: Highball,
  },
  {
    value: "cocktail_glass",
    filterValue: "마티니",
    image: Martini,
  },
  {
    value: "old-fashioned_glass",
    filterValue: "올드패션드 ",
    image: Old,
  },
  {
    value: "collins_glass",
    filterValue: "콜린스",
    image: Collins,
  },
  {
    value: "hurricane_glass",
    filterValue: "허리케인",
    image: Hurricane,
  },
  {
    value: "margarita/Coupette_glass",
    filterValue: "마가리타",
    image: Margarita,
  },
]

const CocktailPage = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <FilterCard filterList={spiritList} filter="i" filterName="재료" />
        <FilterCard filterList={glassList} filter="g" filterName="글라스" />
      </Box>
    </Container>
  )
}

export default CocktailPage
