import {
  Box,
  CardActionArea,
  Container,
  Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material"
import SearchBar from "../../../widgets/SearchBar"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../../../shared/ui"
import { useNavigate } from "react-router-dom"
import { ingredientData } from "../model/ingredientData"

const Ingredient = () => {
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState("")

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmitSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const handleClickIngredient = (strIngredient: string) => {
    navigate(`/ingredient/${strIngredient}`)
  }

  return (
    <Container>
      <SearchBar
        inputValue={inputValue}
        handleInputSearch={handleInputSearch}
        handleSubmitSearch={handleSubmitSearch}
        placeholder="찾으시는 재료를 검색해보세요."
      />
      <Box sx={{ flexGrow: 1 }} mt={4}>
        <SectionTitle text={"재료"} gutterBottom={true} />
        <IngredientSection>
          {ingredientData.map(ingred => (
            <Grid key={ingred.strIngredient}>
              <CardActionArea
                onClick={() => handleClickIngredient(ingred.strIngredient)}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <IngredImage
                      src={`https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient}-Medium.png`}
                      alt="ingred"
                    />
                    <Box flexGrow={1}>
                      <Typography
                        fontFamily="NanumSquareNeoBold"
                        textAlign="center"
                        variant="body1"
                      >
                        {t(`names.${ingred.strIngredient.toLowerCase()}`)}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </CardActionArea>
            </Grid>
          ))}
        </IngredientSection>
      </Box>
    </Container>
  )
}

export default Ingredient

const IngredImage = styled("img")({
  width: "150px",
})

const IngredientSection = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
})
