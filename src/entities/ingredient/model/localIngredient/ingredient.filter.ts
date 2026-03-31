import type { IngredientFilterOptions } from "./ingredient.filterOptions"
import type {
  AbvLevel,
  BaseSpiritGroup,
  Ingredient,
  IngredientFilterState,
} from "./ingredient.type"

export const ingredientFilterOptions: IngredientFilterOptions = {
  categories: [
    { label: "스피릿", value: "base_spirit" },
    { label: "리큐르", value: "liqueur" },
    { label: "아페리티보", value: "aperitivo" },
    { label: "강화 와인", value: "fortified_wine" },
    { label: "와인", value: "wine" },
    { label: "맥주", value: "beer" },
    { label: "과일", value: "fruit" },
    { label: "주스", value: "juice" },
    { label: "시럽", value: "syrup" },
    { label: "허브", value: "herb" },
    { label: "향신료", value: "spice" },
    { label: "유제품", value: "dairy" },
    { label: "커피", value: "coffee" },
    { label: "탄산/음료", value: "soft_drink" },
    { label: "기타", value: "other" },
  ],

  abvLevels: [
    { label: "무알콜 (0%)", value: "NON_ALCOHOLIC" },
    { label: "저도수 (1~15%)", value: "LOW" },
    { label: "중도수 (16~30%)", value: "MEDIUM" },
    { label: "고도수 (31~50%)", value: "HIGH" },
    { label: "초고도수 (51%+)", value: "ULTRA_HIGH" },
  ],

  baseSpiritGroup: [
    { label: "럼", value: "rum" },
    { label: "보드카", value: "vodka" },
    { label: "진", value: "gin" },
    { label: "위스키", value: "whiskey" },
    { label: "브랜디", value: "brandy" },
    { label: "데킬라", value: "tequila" },
    { label: "기타", value: "other" },
  ],

  flavors: [
    { label: "달콤함", value: "sweet" },
    { label: "새콤함", value: "sour" },
    { label: "씁쓸함", value: "bitter" },
    { label: "허브향", value: "herbal" },
    { label: "과일향", value: "fruity" },
    { label: "매콤함", value: "spicy" },
    { label: "부드러움", value: "creamy" },
    { label: "드라이", value: "dry" },
    { label: "고소함", value: "nutty" },
    { label: "초콜릿", value: "chocolate" },
    { label: "커피", value: "coffee" },
    { label: "시트러스", value: "citrus" },
  ],
}

export const filterIngredients = (
  ingredients: Ingredient[],
  filters: IngredientFilterState,
) => {
  return ingredients.filter(ingredient => {
    // category
    if (
      filters.categories.length &&
      !filters.categories.includes(ingredient.category)
    ) {
      return false
    }

    // abv
    if (filters.abvLevels.length) {
      const level = getAbvLevel(ingredient.abv)

      if (!filters.abvLevels.includes(level)) {
        return false
      }
    }

    // base spirit
    if (
      filters.baseSpiritGroups.length &&
      !filters.baseSpiritGroups.includes(
        ingredient.baseSpiritGroup as BaseSpiritGroup,
      )
    ) {
      return false
    }

    // flavor
    if (filters.flavors.length) {
      const hasFlavor = ingredient.flavorProfile?.some(flavor =>
        filters.flavors.includes(flavor),
      )

      if (!hasFlavor) return false
    }

    // search
    if (filters.search) {
      const keyword = filters.search.toLowerCase()

      if (!ingredient.name.toLowerCase().includes(keyword)) {
        return false
      }
    }

    return true
  })
}

export const initialFilterState: IngredientFilterState = {
  categories: [],
  baseSpiritGroups: [],
  abvLevels: [],
  flavors: [],
}

export const getAbvLevel = (abv?: number): AbvLevel => {
  const value = abv ?? 0

  if (value === 0) return "NON_ALCOHOLIC"
  if (value <= 15) return "LOW"
  if (value <= 30) return "MEDIUM"
  if (value <= 50) return "HIGH"

  return "ULTRA_HIGH"
}

export const getSelectedFilterCount = (filters: IngredientFilterState) => {
  let count = 0

  count += filters.categories.length
  count += filters.baseSpiritGroups.length
  count += filters.abvLevels.length
  count += filters.flavors.length

  if (filters.search) count += 1

  return count
}
