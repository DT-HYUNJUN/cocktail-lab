import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  styled,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"
import { CocktailCard, SectionTitle } from "../../../shared/ui"
import getIngredientById from "../api/getIngredientById"
import getCocktailsByIngredient from "../api/getCocktailsByIngredient"
import { useEffect } from "react"

const IngredientDetailPage = () => {
  const { idIngredient } = useParams()
  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      console.log(state)
    }
  }, [state])

  const { data: ingredient, isLoading } = useQuery({
    queryKey: ["getIngredientById"],
    queryFn: () => {
      if (!idIngredient) {
        throw new Error("idDrink is required")
      }
      return getIngredientById(idIngredient)
    },
    enabled: !!idIngredient,
  })

  const { data: cocktailList } = useQuery({
    queryKey: ["getCocktailsByIngredient"],
    queryFn: () => {
      if (!ingredient) {
        throw new Error("ingredient is required")
      }
      return getCocktailsByIngredient(ingredient.strIngredient)
    },
    enabled: !!ingredient,
  })

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  return isLoading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    ingredient && (
      <Container>
        <Box display="flex" flexDirection="column" alignItems="center" mb={10}>
          <DrinkImage
            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`}
          />
          <Box display="flex" gap={1} mb={2}>
            {ingredient.strABV && (
              <Button
                sx={{ borderRadius: "5px" }}
                variant="contained"
                size="small"
              >
                <Typography sx={{ color: "white" }} variant="caption">
                  #{ingredient.strABV}도
                </Typography>
              </Button>
            )}
            {ingredient.strType && (
              <Button
                sx={{ borderRadius: "5px" }}
                variant="contained"
                size="small"
              >
                <Typography sx={{ color: "white" }} variant="caption">
                  #{t(`types.${ingredient.strType}`)}
                </Typography>
              </Button>
            )}
          </Box>
          <Typography fontFamily="NanumSquareNeoHeavy" variant="h4">
            {t(`names.${ingredient.strIngredient.toLowerCase()}`)}
          </Typography>
        </Box>
        <SectionTitle
          text={`'${t(`names.${ingredient.strIngredient.toLowerCase()}`)}' 칵테일`}
          variant="body1"
          gutterBottom={true}
        />
        {cocktailList && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={4}
          >
            {cocktailList.map(cocktail => (
              <CocktailCard key={cocktail.idDrink} cocktailCard={cocktail} />
            ))}
          </Box>
        )}
      </Container>
    )
  )
}

export default IngredientDetailPage

const DrinkImage = styled("img")({
  width: "240px",
  height: "240px",
  borderRadius: "10px",
  marginBottom: "10px",
})
