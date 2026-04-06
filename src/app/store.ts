import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { RandomCocktail } from "../pages/home/model/types"
import type {
  Ingredient,
  IngredientFilterState,
} from "../entities/ingredient/model/localIngredient/ingredient.type"
import { initialFilterState } from "../entities/ingredient/model/localIngredient/ingredient.filter"

// 랜덤 칵테일
type RandomCocktailState = {
  randomCocktail?: RandomCocktail
}

type RandomCocktailAction = {
  updateRandomCocktail: (randomCocktail: RandomCocktail) => void
}

export const useRandomCocktailStore = create<
  RandomCocktailState & RandomCocktailAction
>()(
  persist(
    (set, get) => ({
      updateRandomCocktail: randomCocktail => set({ randomCocktail }),
    }),
    {
      name: "randomCocktail-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

// 최근 검색어
type RecentSearchState = {
  searchValue: string
  recentSearchValueList: string[]
}

type RecentSearchAction = {
  updateSearchValue: (searchValue: string) => void
  addRecentSearchValueList: (searchValue: string) => void
  deleteRecentSearchValueList: (searchValue: string) => void
  resetRecentSearchValueList: () => void
}

export const useRecentSearchStore = create<
  RecentSearchState & RecentSearchAction
>()(
  persist(
    (set, get) => ({
      searchValue: "",
      recentSearchValueList: [],
      updateSearchValue: searchValue => set({ searchValue }),
      addRecentSearchValueList: (searchValue: string) =>
        set(state => ({
          recentSearchValueList: state.recentSearchValueList.includes(
            searchValue,
          )
            ? [
                searchValue,
                ...state.recentSearchValueList.slice(
                  0,
                  state.recentSearchValueList.findIndex(
                    value => value === searchValue,
                  )!,
                ),
                ...state.recentSearchValueList.slice(
                  state.recentSearchValueList.findIndex(
                    value => value === searchValue,
                  )! + 1,
                ),
              ]
            : [searchValue, ...state.recentSearchValueList],
        })),
      deleteRecentSearchValueList: (searchValue: string) =>
        set(state => ({
          recentSearchValueList: state.recentSearchValueList.filter(
            value => value !== searchValue,
          ),
        })),
      resetRecentSearchValueList: () => set({ recentSearchValueList: [] }),
    }),
    {
      name: "recentSearch-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

interface IsFromIngredient {
  scrollY: number
  state: boolean
}

// 재료
type IngredientState = {
  myIngredientList: Ingredient[]
  selectedFilters: IngredientFilterState
  isFromIngredient: IsFromIngredient
}

type IngredientAction = {
  updateMyIngredientList: (ingredient: Ingredient) => void
  updateSelectedFilters: (filters: IngredientFilterState) => void
  updateIsFromIngredient: (fromIngredient: IsFromIngredient) => void
}

export const useIngredientStore = create<IngredientState & IngredientAction>(
  set => ({
    myIngredientList: [],
    selectedFilters: initialFilterState,
    isFromIngredient: { scrollY: 0, state: false },
    updateMyIngredientList: ingredient =>
      set(state => ({
        myIngredientList: state.myIngredientList.some(
          ingred => ingred.name === ingredient.name,
        )
          ? state.myIngredientList.filter(
              ingred => ingred.name !== ingredient.name,
            )
          : [...state.myIngredientList, ingredient],
      })),
    updateSelectedFilters: selectedFilters => set({ selectedFilters }),
    updateIsFromIngredient: state => set({ isFromIngredient: state }),
  }),
)
