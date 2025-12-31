import { Card, CardActionArea, CardMedia, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import type { CocktailCardType } from "../model/types"

interface CocktailCardProps {
  cocktailCard: CocktailCardType
}

const CocktailCard = ({ cocktailCard }: CocktailCardProps) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "cocktails",
  })

  const navigate = useNavigate()

  const handleClickCard = () => {
    navigate(`/cocktail/detail/${cocktailCard.idDrink}`)
  }

  return (
    <div onClick={handleClickCard}>
      <Card sx={{ width: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={cocktailCard.strDrinkThumb}
            alt="preview"
            loading="lazy"
          />
        </CardActionArea>
      </Card>
      <Typography
        fontFamily="NanumSquareNeoBold"
        gutterBottom
        variant="subtitle1"
        m={0}
        sx={{ boxSizing: "border-box" }}
      >
        {/* {t(drink.strDrink)} */}
        {cocktailCard.strDrink}
      </Typography>
    </div>
  )
}

export default CocktailCard
