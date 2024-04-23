import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import HeadText from "../components/Common/HeadText"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import {
  getByFilter,
  getIngredientByName,
} from "../features/cocktail/cocktailSlice"
import ShareIcon from "@mui/icons-material/Share"

const CocktailDetail = () => {
  const drink = useAppSelector((state: RootState) => state.selectedCocktail)
  const loading = useAppSelector((state: RootState) => state.loading)

  const { t } = useTranslation("translation", {
    keyPrefix: "cocktails",
  })

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const handleClickIngredient = (strIngredient: string) => {
    dispatch(getIngredientByName(strIngredient))
    navigate(`/ingredient/${strIngredient}`)
  }

  const handleClickGlass = (strGlass: string) => {
    // navigate(`/cocktail/g/${strGlass}`)
  }

  const handleClickShare = (idDrink: string, strDrink: string) => {
    if (navigator.share) {
      navigator.share({
        title: strDrink,
        url: `https://cacaktail.netlify.app/cocktail/detail/${idDrink}`,
      })
    } else {
      alert("공유하기가 지원되지 않는 환경입니다.")
    }
  }

  return drink && loading ? (
    <div>loading</div>
  ) : (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <IconButton
          onClick={() => handleClickShare(drink.idDrink, drink.strDrink)}
          size="large"
          color="primary"
        >
          <ShareIcon fontSize="large" />
        </IconButton>
        <DrinkImage src={drink.strDrinkThumb} />
        <Box display="flex" gap={1} mb={2}>
          <Button sx={{ borderRadius: "5px" }} variant="contained" size="small">
            <Typography sx={{ color: "white" }} variant="caption">
              {drink.strAlcoholic === "Alcoholic" ? "#알콜" : "#논알콜"}
            </Typography>
          </Button>
          <Button
            sx={{ borderRadius: "5px" }}
            variant="contained"
            size="small"
            onClick={() => handleClickGlass(drink.strGlass)}
          >
            <Typography sx={{ color: "white" }} variant="caption">
              #{t(`glass.${drink.strGlass}`)}
            </Typography>
          </Button>
        </Box>
        <Typography fontFamily="NanumSquareNeoHeavy" variant="h4">
          {/* {t(drink.strDrink)} */}
          {drink.strDrink}
        </Typography>
      </Box>
      {/* 재료 */}
      <Box alignItems="start" mt={3}>
        <HeadText text={"재료"} />
        <Paper elevation={3}>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            p={2}
            pt={4}
            pb={4}
            mt={1}
          >
            {drink.ingredients.map(
              (ingred, index) =>
                ingred.strIngredient && (
                  <Box
                    key={ingred.id}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      component="div"
                      display="flex"
                      alignItems="center"
                      onClick={() =>
                        handleClickIngredient(ingred.strIngredient)
                      }
                    >
                      <IngredImage
                        src={`https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient}-Small.png`}
                        alt=""
                      />
                      <Typography fontFamily="NanumSquareNeoBold">
                        {/* {t(ingred.strIngredient)} */}
                        {ingred.strIngredient}
                      </Typography>
                    </Box>
                    <Typography fontFamily="NanumSquareNeoBold">
                      {drink.measures[index].strMeasure}
                    </Typography>
                  </Box>
                ),
            )}
          </Box>
        </Paper>
      </Box>
      {/* 레시피 */}
      <Box mt={4}>
        <HeadText text={"레시피"} />
        <Paper elevation={3}>
          <Box p={2} pt={4} pb={4} mt={1}>
            {drink.strInstructions ? (
              drink.strInstructions
                .split(/[.!]/)
                .slice(0, -1)
                .map((inst, index) => (
                  <Box display="flex" alignItems="start" gap={1} key={index}>
                    <Typography
                      fontFamily="NanumSquareNeoHeavy"
                      variant="subtitle2"
                    >
                      {index + 1}.
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      {inst}
                    </Typography>
                  </Box>
                ))
            ) : (
              <Box>
                <Typography
                  fontFamily="NanumSquareNeoHeavy"
                  variant="subtitle2"
                >
                  1.
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {drink.strInstructions}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default CocktailDetail

const DrinkImage = styled("img")({
  width: "240px",
  height: "240px",
  borderRadius: "10px",
  marginBottom: "10px",
})

const IngredImage = styled("img")({
  width: "50px",
  height: "50px",
})
