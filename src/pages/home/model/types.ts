export interface RandomCocktail {
  idDrink: string
  strDrink: string
  strDrinkThumb: string
  strTags?: string
}

export interface GetCocktailByFilterPayload {
  filter: "c" | "g" | "i" | "a"
  filterValue: string
}

export interface CocktailCard {
  strDrink: string
  strDrinkThumb: string
}
