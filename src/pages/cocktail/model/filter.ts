import { Alcohol, Category, Glass, Ingredient } from "../assets"
import type { FilterItem, CocktailFilter } from "./types"

const categoryList: FilterItem[] = [
  { value: "Ordinary Drink", label: "일반", image: Category.Ordinary },
  { value: "Cocktail", label: "클래식", image: Category.Classic },
  { value: "Shake", label: "쉐이킹", image: Category.Shaking },
  { value: "Shot", label: "샷", image: Category.Shot },
  { value: "Cocoa", label: "코코아", image: Category.Cocoa },
  { value: "Coffee / Tea", label: "커피 / 차", image: Category.Coffee },
  { value: "Homemade Liqueur", label: "수제 리큐르", image: Category.Liqueur },
  { value: "Beer", label: "맥주", image: Category.Beer },
]

export const ingredientList: FilterItem[] = [
  { value: "rum", label: "럼" },
  { value: "Dark rum", label: "다크 럼" },
  { value: "gin", label: "진" },
  { value: "vodka", label: "보드카" },
  { value: "Whiskey", label: "위스키" },
  { value: "tequila", label: "데킬라" },
  { value: "brandy", label: "브랜디" },
  { value: "Triple sec", label: "트리플 섹" },
  { value: "Sweet Vermouth", label: "스위트 베르무트" },
  { value: "Dry Vermouth", label: "드라이 베르무트" },
  { value: "Champagne", label: "샴페인" },
  { value: "Bitters", label: "비터스" },
  { value: "Kahlua", label: "깔루아" },
  { value: "Red Wine", label: "와인" },
  { value: "Cognac", label: "꼬냑" },
  { value: "Galliano", label: "갈리아노" },
  { value: "Midori melon liqueur", label: "미도리" },
  { value: "Sambuca", label: "삼부카" },
  { value: "Amaretto", label: "아마레또" },
  { value: "Creme de Cassis", label: "크렘 드 카시스" },
]

export const glassList: FilterItem[] = [
  {
    value: "highball_glass",
    label: "하이볼",
    image: Glass.Highball,
  },
  {
    value: "cocktail_glass",
    label: "마티니",
    image: Glass.Martini,
  },
  {
    value: "old-fashioned_glass",
    label: "올드패션드 ",
    image: Glass.Old,
  },
  {
    value: "collins_glass",
    label: "콜린스",
    image: Glass.Collins,
  },
  {
    value: "hurricane_glass",
    label: "허리케인",
    image: Glass.Hurricane,
  },
  {
    value: "margarita/Coupette_glass",
    label: "마가리타",
    image: Glass.Margarita,
  },
]

const alcoholicList: FilterItem[] = [
  {
    value: "Alcoholic",
    label: "알콜",
    image: Alcohol.Alcohol,
  },
  {
    value: "Non alcoholic",
    label: "논알콜",
    image: Alcohol.AlcoholFree,
  },
]

export const cocktailFilterList: CocktailFilter[] = [
  { value: "c", label: "카테고리", itemList: categoryList },
  { value: "g", label: "글래스", itemList: glassList },
  { value: "i", label: "재료", itemList: ingredientList },
  { value: "a", label: "알코올", itemList: alcoholicList },
]
