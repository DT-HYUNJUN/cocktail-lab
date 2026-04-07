import type { AxiosResponse } from "axios"
import type { DrinkDto } from "../../../entities/drink/api/types"
import { apiClient } from "../../../shared/api"
import type { GetCocktailByFilterPayload } from "../model/types"

const getCocktailByFilter = async (payload: GetCocktailByFilterPayload) => {
  const response: AxiosResponse<DrinkDto> = await apiClient.get(
    `filter.php?${payload.filter}=${payload.filterValue}`,
  )
  return response.data.drinks
}

export default getCocktailByFilter
