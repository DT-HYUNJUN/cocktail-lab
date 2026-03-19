import type { Ingredient, IngredientSortOption } from "./ingredient.type"

export const ingredientSortOptions: {
  label: string
  value: IngredientSortOption
}[] = [
  { label: "이름순 (A-Z)", value: "NAME_ASC" },
  { label: "이름순 (Z-A)", value: "NAME_DESC" },
  { label: "낮은 도수순", value: "ABV_ASC" },
  { label: "높은 도수순", value: "ABV_DESC" },
]

export const sortIngredients = (
  list: Ingredient[],
  sortOption: IngredientSortOption,
) => {
  const sorted = [...list]

  switch (sortOption) {
    case "NAME_ASC":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))

    case "NAME_DESC":
      return sorted.sort((a, b) => b.name.localeCompare(a.name))

    case "ABV_ASC":
      return sorted.sort((a, b) => (a.abv ?? 0) - (b.abv ?? 0))

    case "ABV_DESC":
      return sorted.sort((a, b) => (b.abv ?? 0) - (a.abv ?? 0))

    default:
      return sorted
  }
}
