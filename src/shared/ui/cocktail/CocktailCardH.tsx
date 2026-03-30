import { Chip, Skeleton, styled, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { RandomCocktail } from "../../../pages/home/model/types"

interface CocktailCardHProps {
  cocktail: RandomCocktail
  isFetching: boolean
}

const CocktailCardH = ({ cocktail, isFetching }: CocktailCardHProps) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    navigate(`/cocktail/${cocktail.idDrink}`)
  }

  return (
    <Card onClick={handleClickCard}>
      <CardContent>
        <CardImageBox>
          {isFetching ? (
            <Skeleton variant="rounded" width={128} height={128} />
          ) : (
            <CardImage src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          )}
        </CardImageBox>
        <CardDetail>
          <CardTagBox>
            {isFetching ? (
              <Skeleton variant="text" width={40} />
            ) : (
              cocktail.strTags
                ?.split(",")
                .map(tag => (
                  <Chip
                    variant="filled"
                    color="primary"
                    size="small"
                    key={tag}
                    label={tag}
                  />
                ))
            )}
          </CardTagBox>
          {isFetching ? (
            <Skeleton variant="text" width={100} />
          ) : (
            <Typography variant="h4">{cocktail.strDrink}</Typography>
          )}
        </CardDetail>
      </CardContent>
    </Card>
  )
}

export default CocktailCardH

const Card = styled("div")({
  borderRadius: 20,
  boxShadow: "rgb(0 0 0 / 0.25) 0 25px 50px -12px ",
  cursor: "pointer",
})

const CardContent = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
})

const CardImageBox = styled("div")({
  width: 128,
  height: 128,
  overflow: "hidden",
  borderRadius: 20,
})

const CardImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
})

const CardDetail = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 4,
})

const CardTagBox = styled("div")({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 8,
  paddingRight: 8,
})
