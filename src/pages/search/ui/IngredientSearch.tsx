import { Box, Typography } from "@mui/material"
import IngredientCard from "../../../shared/ui/IngredientCard"
import type { Ingredient } from "../../../entities/ingredient/model/types"
import { SectionTitle } from "../../../shared/ui"

interface IngredientSearchProps {
  ingredientList: Ingredient[]
}

const IngredientSearch = ({ ingredientList }: IngredientSearchProps) => {
  return (
    <Box display="flex" flexDirection="column" mt={4}>
      <Typography fontFamily="NanumSquareNeoHeavy" gutterBottom pl={3}>
        재료
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        {ingredientList.length > 0 ? (
          ingredientList.map(ingred => (
            <IngredientCard key={ingred.idIngredient} ingred={ingred} />
          ))
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={10}
          >
            <SectionTitle text="검색하신 재료가 없습니다." variant="h6" />
            <SectionTitle text="영어로 검색해보세요!" variant="h6" />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default IngredientSearch
