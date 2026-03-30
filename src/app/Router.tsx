import HomePage from "../pages/home/ui/HomePage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cocktail from "../pages/cocktail/ui/CocktailPage"
import Ingredient from "../pages/ingredient/ui/IngredientPage"
import ScrollToTop from "../widgets/ScrollToTop"
import CocktailDetailPage from "../pages/cocktailDetail/ui/CocktailDetailPage"
import MyBarPage from "../pages/myBar/ui/MyBarPage"
import IngredientDetailPage from "../pages/ingredientDetail/ui/IngredientDetailPage"
import SearchPage from "../pages/search/ui/SearchPage"
import FilteredCocktailPage from "../pages/filteredCocktail/ui/FilteredCocktailPage"
import MainLayout from "./layouts/MainLayout"

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cocktail" element={<Cocktail />} />
          <Route path="/cocktail/ingredient" element={<Ingredient />} />
          <Route
            path="/ingredient/:strIngredient"
            element={<IngredientDetailPage />}
          />
          <Route path="/cocktail/:idDrink" element={<CocktailDetailPage />} />
          <Route
            path="/cocktail/:filter/:pathFilterValue"
            element={<FilteredCocktailPage />}
          />
          <Route path="/search/:name" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mybar" element={<MyBarPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
