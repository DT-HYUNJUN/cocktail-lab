import type { AxiosResponse } from "axios"
import { apiClient } from "../../../shared/api"
import type { DrinkDto } from "../../../entities/drink/api/types"

const getCocktailByFilter = async (filter: string, pathfilterValue: string) => {
  const response: AxiosResponse<DrinkDto> = await apiClient.get(
    `filter.php?${filter}=${pathfilterValue}`,
  )
  return response.data.drinks
}

export default getCocktailByFilter
