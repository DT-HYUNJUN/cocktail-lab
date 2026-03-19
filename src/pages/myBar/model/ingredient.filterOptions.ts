import type {
  AbvLevel,
  BaseSpiritGroup,
  FlavorProfile,
  IngredientCategory,
} from "./ingredient.type"

export interface IngredientFilterOptions {
  categories: { label: string; value: IngredientCategory }[]
  abvLevels: { label: string; value: AbvLevel }[]
  baseSpiritGroup: { label: string; value: BaseSpiritGroup }[]
  flavors: { label: string; value: FlavorProfile }[]
}
