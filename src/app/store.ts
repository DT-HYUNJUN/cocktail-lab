import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { RandomCocktail } from "../pages/home/model/types"
import type {
  Ingredient,
  IngredientFilterState,
} from "../pages/myBar/model/ingredient.type"
import { initialFilterState } from "../pages/myBar/model/ingredient.filter"

// 칵테일
type CocktailState = {
  myBar: string[]
  searchValue: string
}

type CocktailAction = {
  updateMyBar: (ingredient: string) => void
  updateSearchValue: (newSearchValue: string) => void
}

export const useCocktailStore = create<CocktailState & CocktailAction>(set => ({
  myBar: [],
  searchValue: "",
  updateMyBar: (ingredient: string) =>
    set(state => ({
      myBar: state.myBar.includes(ingredient)
        ? state.myBar.filter(ingred => ingred !== ingredient)
        : [...state.myBar, ingredient],
    })),
  updateSearchValue: (newSearchValue: string) =>
    set({ searchValue: newSearchValue }),
}))

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
      // randomCocktail: {
      //   idDrink: "",
      //   strDrink: "",
      //   strDrinkThumb: "",
      //   strTags: "",
      // },
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
  recentSearchValueList: string[]
}

type RecentSearchAction = {
  addRecentSearchValueList: (searchValue: string) => void
  deleteRecentSearchValueList: (searchValue: string) => void
  resetRecentSearchValueList: () => void
}

export const useRecentSearchStore = create<
  RecentSearchState & RecentSearchAction
>()(
  persist(
    (set, get) => ({
      recentSearchValueList: [],
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

// 마이 바
type MyBarState = {
  myBarList: Ingredient[]
  selectedFilters: IngredientFilterState
  isFromIngredient: IsFromIngredient
}

type MyBarAction = {
  updateMyBarList: (ingredient: Ingredient) => void
  updateSelectedFilters: (filters: IngredientFilterState) => void
  updateIsFromIngredient: (fromIngredient: IsFromIngredient) => void
}

export const useMyBarStore = create<MyBarState & MyBarAction>(set => ({
  myBarList: [],
  selectedFilters: initialFilterState,
  isFromIngredient: { scrollY: 0, state: false },
  updateMyBarList: ingredient =>
    set(state => ({
      myBarList: state.myBarList.some(ingred => ingred.name === ingredient.name)
        ? state.myBarList.filter(ingred => ingred.name !== ingredient.name)
        : [...state.myBarList, ingredient],
    })),
  updateSelectedFilters: selectedFilters => set({ selectedFilters }),
  updateIsFromIngredient: state => set({ isFromIngredient: state }),
}))
