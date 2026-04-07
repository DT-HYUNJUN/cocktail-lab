export type FilterValue = "c" | "i" | "g" | "a"

export interface FilterItem {
  value: string
  label: string
  image?: any
}

export interface CocktailFilter {
  value: FilterValue
  label: string
  itemList: FilterItem[]
}

export interface GetCocktailByFilterPayload {
  filter: FilterValue
  filterItem: string
}
