import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  styled,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { CocktailCardType } from "../model/types"

interface CocktailCardProps {
  cocktailCard: CocktailCardType
}

const CocktailCard = ({ cocktailCard }: CocktailCardProps) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    navigate(`/cocktail/${cocktailCard.idDrink}`)
  }

  return (
    <Card onClick={handleClickCard}>
      <CardActionArea>
        <CardHeader></CardHeader>
        <CardMedia
          component="img"
          height="300"
          image={cocktailCard.strDrinkThumb}
          alt={cocktailCard.strDrink}
          loading="lazy"
        />
        <CardContent>
          <Typography variant="h4" fontWeight={700}>
            {cocktailCard.strDrink}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CocktailCard
