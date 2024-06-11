import { Box, Grid, Paper, Typography, styled } from "@mui/material"
import { useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"
import { useTranslation } from "react-i18next"

const MyBarList = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const myBar = useAppSelector((state: RootState) => state.cocktail.myBar)

  return (
    <Box sx={{ flexGrow: 1, width: 345 }} mt={4}>
      <Grid container spacing={2}>
        {myBar.map((ingred, index) => (
          <Grid key={index} item xs={6}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                bgcolor: "#d9f1ff",
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <IngredImage
                  src={`https://www.thecocktaildb.com/images/ingredients/${ingred}-Medium.png`}
                  alt="ingred"
                />
                <Box flexGrow={1}>
                  <Typography
                    fontFamily="NanumSquareNeoBold"
                    textAlign="center"
                    variant="body1"
                  >
                    {t(`names.${ingred.toLowerCase()}`)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default MyBarList

const IngredImage = styled("img")({
  width: "150px",
})
