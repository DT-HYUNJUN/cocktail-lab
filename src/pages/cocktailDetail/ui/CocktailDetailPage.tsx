import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Typography,
  styled,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import ShareIcon from "@mui/icons-material/Share"
import { useQuery } from "@tanstack/react-query"
import { getCocktailById } from "../api/getCocktailById"
import { SectionTitle } from "../../../shared/ui"
import Loading from "../../../shared/ui/Loading"

const CocktailDetailPage = () => {
  const { idDrink } = useParams()

  const { data: cocktail, isLoading } = useQuery({
    queryKey: ["getCocktailById", idDrink],
    queryFn: () => {
      if (!idDrink) {
        throw new Error("idDrink is required")
      }
      return getCocktailById(idDrink)
    },
    enabled: !!idDrink,
  })

  const { t } = useTranslation("translation", {
    keyPrefix: "cocktails",
  })

  const navigate = useNavigate()

  const handleClickIngredient = (strIngredient: string) => {
    navigate(`/ingredient/${strIngredient}`)
  }

  const handleClickGlass = (strGlass: string) => {
    navigate(`/cocktail/g/${strGlass}`)
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

  const ingredients = Array.from({ length: 15 }, (_, i) => {
    if (cocktail) {
      const ingredient =
        cocktail[`strIngredient${i + 1}` as keyof typeof cocktail]
      const measure = cocktail[`strMeasure${i + 1}` as keyof typeof cocktail]

      if (!ingredient) {
        return null
      }

      return { ingredient, measure }
    }
  })

  return isLoading ? (
    <Loading />
  ) : (
    cocktail && (
      <Container>
        <Section>
          <IconButton
            onClick={() =>
              handleClickShare(cocktail.idDrink, cocktail.strDrink)
            }
            size="large"
            color="primary"
          >
            <ShareIcon fontSize="large" />
          </IconButton>
          <DrinkImage src={cocktail.strDrinkThumb} />
          <Box display="flex" gap={1} mb={2}>
            <Button
              sx={{ borderRadius: "5px" }}
              variant="contained"
              size="small"
            >
              <Typography sx={{ color: "white" }} variant="caption">
                {cocktail.strAlcoholic === "Alcoholic" ? "#알콜" : "#논알콜"}
              </Typography>
            </Button>
            <Button
              sx={{ borderRadius: "5px" }}
              variant="contained"
              size="small"
              onClick={() => handleClickGlass(cocktail.strGlass)}
            >
              <Typography sx={{ color: "white" }} variant="caption">
                #{t(`glass.${cocktail.strGlass}`)}
              </Typography>
            </Button>
          </Box>
          <Typography fontFamily="NanumSquareNeoHeavy" variant="h4">
            {/* {t(cocktail.strDrink)} */}
            {cocktail.strDrink}
          </Typography>
        </Section>
        {/* 재료 */}
        <Box alignItems="start" mt={3}>
          <SectionTitle text={"재료"} />
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
              {ingredients.map(
                ingred =>
                  ingred && (
                    <Box
                      key={ingred.ingredient}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box
                        component="div"
                        display="flex"
                        alignItems="center"
                        onClick={() => handleClickIngredient(ingred.ingredient)}
                      >
                        <IngredImage
                          src={`https://www.thecocktaildb.com/images/ingredients/${ingred.ingredient}-Small.png`}
                          alt=""
                        />
                        <Typography fontFamily="NanumSquareNeoBold">
                          {/* {t(ingred.strIngredient)} */}
                          {ingred.ingredient}
                        </Typography>
                      </Box>
                      <Typography fontFamily="NanumSquareNeoBold">
                        {ingred.measure}
                      </Typography>
                    </Box>
                  ),
              )}
            </Box>
          </Paper>
        </Box>
        {/* 레시피 */}
        <Box mt={4}>
          <SectionTitle text={"레시피"} />
          <Paper elevation={3}>
            <Box p={2} pt={4} pb={4} mt={1}>
              {cocktail.strInstructions ? (
                cocktail.strInstructions
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
                    {cocktail.strInstructions}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  )
}

export default CocktailDetailPage

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

const Section = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
