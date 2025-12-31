import { create } from "zustand"

type State = {
  myBar: string[]
  searchValue: string
}

type Action = {
  updateMyBar: (ingredient: string) => void
  updateSearchValue: (newSearchValue: string) => void
}

export const useCocktail = create<State & Action>(set => ({
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
