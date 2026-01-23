import { Box, CircularProgress, Container } from "@mui/material"
import Menu from "../../../widgets/MenuBar"
import { useTranslation } from "react-i18next"
import ingreds from "../../../shared/i18n/ko/translation.json"
import CocktailSearch from "./CocktailSearch"
import IngredientSearch from "./IngredientSearch"
import { useQuery } from "@tanstack/react-query"
import getCocktailByName from "../api/getCocktailByName"
import { useCocktailStore } from "../../../app/store"
import getIngredientByName from "../api/getIngredientByName"
import { useState } from "react"

const engPattern = /[a-zA-Z]/

const SearchPage = () => {
  const [isCocktailSearch, setIsCocktailSearch] = useState(true)

  const searchValue = useCocktailStore(state => state.searchValue)

  const { data: cocktailData, isLoading: isCocktailLoading } = useQuery({
    queryKey: ["getCocktailByName"],
    queryFn: () => getCocktailByName(checkName(searchValue, "cocktail")),
    enabled: !!searchValue,
  })

  const { data: ingredientList, isLoading: isIngredientLoading } = useQuery({
    queryKey: ["getIngredientByName"],
    queryFn: () => getIngredientByName(checkName(searchValue, "ingredient")),
    enabled: !!searchValue,
  })

  const handleClickCocktail = () => {
    setIsCocktailSearch(true)
  }
  const handleClickIngredient = () => {
    setIsCocktailSearch(false)
  }

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const checkName = (name: string, findValue: "ingredient" | "cocktail") => {
    if (engPattern.test(name)) {
      return name
    } else {
      if (name in ingreds.ingredients[`ko-${findValue}-names`]) {
        return t(`ko-${findValue}-names.${name}`)
      } else {
        return name
      }
    }
  }

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Menu
          value={isCocktailSearch}
          handleClickOne={handleClickCocktail}
          handleClickTwo={handleClickIngredient}
          text={{ one: "칵테일", two: "재료" }}
        />
      </Box>
      {isCocktailSearch &&
        (isCocktailLoading ? (
          <CircularProgress />
        ) : (
          cocktailData && <CocktailSearch cocktailList={cocktailData.drinks} />
        ))}
      {!isCocktailSearch && isIngredientLoading ? (
        <CircularProgress />
      ) : (
        ingredientList && <IngredientSearch ingredientList={ingredientList} />
      )}
    </Container>
  )
}

export default SearchPage
