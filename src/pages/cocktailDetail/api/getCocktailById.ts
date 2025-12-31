import type { AxiosResponse } from "axios"
import { apiClient } from "../../../shared/api"
import type { DrinkDto } from "../../../entities/drink/api/types"

export const getCocktailById = async (idDrink: string) => {
  const response: AxiosResponse<DrinkDto> = await apiClient.get(
    `/lookup.php?i=${idDrink}`,
  )
  return response.data.drinks[0]
}
