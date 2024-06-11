import { Box, Typography } from "@mui/material"
import CocktailCard from "../Common/CocktailCard"
import { useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"
import HeadText from "../Common/HeadText"
import LoadingCard from "../Common/LoadingCard"

const Cocktail = () => {
  const drinkList = useAppSelector(
    (state: RootState) => state.cocktail.cocktailList,
  )
  const loading = useAppSelector((state: RootState) => state.cocktail.loading)

  return (
    <Box display="flex" flexDirection="column" mt={4}>
      <Typography fontFamily="NanumSquareNeoHeavy" gutterBottom pl={3}>
        칵테일
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        {loading ? (
          <div>
            {[0, 1, 2].map(item => (
              <LoadingCard key={item} />
            ))}
          </div>
        ) : drinkList.length > 0 ? (
          drinkList.map(drink => (
            <CocktailCard key={drink.idDrink} drink={drink} />
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={10}
          >
            <HeadText text="검색하신 칵테일이 없습니다." variant="h6" />
            <HeadText text="영어로 검색해보세요!" variant="h6" />
          </Box>
        )}
        {drinkList.length > 0 && <HeadText text="끝" variant="h4" />}
      </Box>
    </Box>
  )
}

export default Cocktail
