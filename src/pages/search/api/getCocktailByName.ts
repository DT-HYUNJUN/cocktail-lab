import type { AxiosResponse } from "axios"
import { apiClient } from "../../../shared/api"
import type { DrinkDto } from "../../../entities/drink/api/types"

const getCocktailByName = async (strDrink: string) => {
  const response: AxiosResponse<DrinkDto> = await apiClient.get(
    `/search.php?s=${strDrink}`,
  )
  return response.data
}

export default getCocktailByName
