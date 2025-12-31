import type { AxiosResponse } from "axios"
import { apiClient } from "../../../shared/api"
import type { CocktailCardType } from "../../../shared/model/types"

interface CocktailByIngredientDto {
  drinks: CocktailCardType[]
}

const getCocktailsByIngredient = async (strIngredient: string) => {
  const response: AxiosResponse<CocktailByIngredientDto> = await apiClient.get(
    `filter.php?i=${strIngredient}`,
  )
  return response.data.drinks
}

export default getCocktailsByIngredient
