export type IngredientCategory =
  | "base_spirit" // 기본 주류 (럼, 진, 보드카)
  | "liqueur" // 리큐르
  | "aperitivo" // 아페리티보
  | "fortified_wine" // 베르무트
  | "wine"
  | "beer"
  | "fruit"
  | "juice"
  | "syrup"
  | "herb"
  | "spice"
  | "dairy"
  | "coffee"
  | "soft_drink"
  | "other"

export type FlavorProfile =
  | "sweet"
  | "sour"
  | "bitter"
  | "herbal"
  | "fruity"
  | "spicy"
  | "creamy"
  | "dry"
  | "nutty"
  | "chocolate"
  | "coffee"
  | "citrus"

export type BaseSpiritGroup =
  | "rum"
  | "vodka"
  | "gin"
  | "whiskey"
  | "brandy"
  | "tequila"
  | "other"

export type AbvLevel =
  | "NON_ALCOHOLIC"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "ULTRA_HIGH"

export interface Ingredient {
  name: string
  category: IngredientCategory
  abv?: number
  flavorProfile?: FlavorProfile[]
  baseSpiritGroup?: BaseSpiritGroup
}

export interface IngredientFilterState {
  categories: IngredientCategory[]
  abvLevels: AbvLevel[]
  baseSpiritGroups: BaseSpiritGroup[]
  flavors: FlavorProfile[]
  search?: string
}

export type IngredientSortOption =
  | "NAME_ASC"
  | "NAME_DESC"
  | "ABV_ASC"
  | "ABV_DESC"
