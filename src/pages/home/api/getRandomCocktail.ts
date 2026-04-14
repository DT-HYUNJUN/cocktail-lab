import type { AxiosResponse } from "axios"
import type { DrinkDto } from "../../../entities/cocktail/api/types"
import { apiClient } from "../../../shared/api"

export const getRandomCocktail = async () => {
  const response: AxiosResponse<DrinkDto> = await apiClient.get(`/random.php`)
  return response.data
}
