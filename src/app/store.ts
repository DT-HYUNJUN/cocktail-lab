import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { RandomCocktail } from "../pages/home/model/types"

type State = {
  myBar: string[]
  searchValue: string
}

type Action = {
  updateMyBar: (ingredient: string) => void
  updateSearchValue: (newSearchValue: string) => void
}

type RandomCocktailState = {
  randomCocktail?: RandomCocktail
  updateRandomCocktail: (randomCocktail: RandomCocktail) => void
}

export const useCocktailStore = create<State & Action>(set => ({
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

export const useRandomCocktailStore = create<RandomCocktailState>()(
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
