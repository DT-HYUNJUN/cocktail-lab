export interface Drink {
  idDrink: string
  strDrink: string
  strCategory: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strDrinkThumb: string
  ingredients: { id: number; strIngredient: string }[]
  measures: { id: number; strMeasure: string }[]
}
