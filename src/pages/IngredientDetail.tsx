import { Box, Button, Container, Typography, styled } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import { useTranslation } from "react-i18next"
import CocktailCard from "../components/Common/CocktailCard"
import type { IDrink } from "../types"
import HeadText from "../components/Common/HeadText"

const IngredientDetail = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const selectedIngredient = useAppSelector(
    (state: RootState) => state.cocktail.selectedIngredient,
  )
  const cocktailList = useAppSelector(
    (state: RootState) => state.cocktail.tempList,
  )

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" mb={10}>
        <DrinkImage
          src={`https://www.thecocktaildb.com/images/ingredients/${selectedIngredient.strIngredient}-Medium.png`}
        />
        <Box display="flex" gap={1} mb={2}>
          {selectedIngredient.strABV && (
            <Button
              sx={{ borderRadius: "5px" }}
              variant="contained"
              size="small"
            >
              <Typography sx={{ color: "white" }} variant="caption">
                #{selectedIngredient.strABV}도
              </Typography>
            </Button>
          )}
          {selectedIngredient.strType && (
            <Button
              sx={{ borderRadius: "5px" }}
              variant="contained"
              size="small"
            >
              <Typography sx={{ color: "white" }} variant="caption">
                #{t(`types.${selectedIngredient.strType}`)}
              </Typography>
            </Button>
          )}
        </Box>
        <Typography fontFamily="NanumSquareNeoHeavy" variant="h4">
          {t(`names.${selectedIngredient.strIngredient.toLowerCase()}`)}
        </Typography>
      </Box>
      <HeadText
        text={`'${t(`names.${selectedIngredient.strIngredient.toLowerCase()}`)}' 칵테일`}
        variant="body1"
        gutterBottom={true}
      />
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        {cocktailList.map(cocktail => (
          <CocktailCard key={cocktail.idDrink} drink={cocktail as IDrink} />
        ))}
      </Box>
    </Container>
  )
}

export default IngredientDetail

const DrinkImage = styled("img")({
  width: "240px",
  height: "240px",
  borderRadius: "10px",
  marginBottom: "10px",
})
