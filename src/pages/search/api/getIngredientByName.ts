import type { AxiosResponse } from "axios"
import { apiClient } from "../../../shared/api"
import type { Ingredient } from "../../../entities/ingredient/model/types"

const getIngredientByName = async (strIngredient: string) => {
  const response: AxiosResponse<Ingredient[]> = await apiClient.get(
    `/search.php?i=${strIngredient}`,
  )
  return response.data
}

export default getIngredientByName
