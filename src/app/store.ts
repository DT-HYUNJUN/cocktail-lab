import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { RandomCocktail } from "../pages/home/model/types"

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
  recentSearchValueList: ["검색어1", "검색어2"],
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
