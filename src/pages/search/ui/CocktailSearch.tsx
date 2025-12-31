import { Box, Typography } from "@mui/material"
import CocktailCard from "../../../shared/ui/CocktailCard"
import SectionTitle from "../../../shared/ui/SectionTitle"
import type { DrinkData } from "../../../entities/drink/api/types"

interface CocktailSearchProps {
  cocktailList: DrinkData[]
}

const CocktailSearch = ({ cocktailList }: CocktailSearchProps) => {
  return (
    <Box display="flex" flexDirection="column" mt={4}>
      <Typography fontFamily="NanumSquareNeoHeavy" gutterBottom pl={3}>
        칵테일
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        {cocktailList.length > 0 ? (
          cocktailList.map(cocktail => (
            <CocktailCard key={cocktail.idDrink} cocktailCard={cocktail} />
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={10}
          >
            <SectionTitle text="검색하신 칵테일이 없습니다." variant="h6" />
            <SectionTitle text="영어로 검색해보세요!" variant="h6" />
          </Box>
        )}
        {cocktailList.length > 0 && <SectionTitle text="끝" variant="h4" />}
      </Box>
    </Box>
  )
}

export default CocktailSearch
