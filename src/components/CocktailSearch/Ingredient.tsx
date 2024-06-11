import type { RootState } from "../../app/store"
import { useAppSelector } from "../../app/hooks"
import { Box, Typography } from "@mui/material"
import IngredientCard from "../CocktailSearch/IngredientCard"
import { useEffect } from "react"
import HeadText from "../Common/HeadText"
import LoadingCard from "../Common/LoadingCard"

const Ingredient = () => {
  const ingredientList = useAppSelector(
    (state: RootState) => state.cocktail.ingredientList,
  )
  const loading = useAppSelector((state: RootState) => state.cocktail.loading)

  return (
    <Box display="flex" flexDirection="column" mt={4}>
      <Typography fontFamily="NanumSquareNeoHeavy" gutterBottom pl={3}>
        재료
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        {loading ? (
          <LoadingCard />
        ) : ingredientList.length > 0 ? (
          ingredientList.map(ingred => (
            <IngredientCard key={ingred.idIngredient} ingred={ingred} />
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={10}
          >
            <HeadText text="검색하신 재료가 없습니다." variant="h6" />
            <HeadText text="영어로 검색해보세요!" variant="h6" />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Ingredient
