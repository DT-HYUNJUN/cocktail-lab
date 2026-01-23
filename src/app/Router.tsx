import HomePage from "../pages/home/ui/HomePage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../widgets/Navbar"
import BottomNavbar from "../widgets/BottomNavbar"
import Cocktail from "../pages/cocktail/ui/CocktailPage"
import Ingredient from "../pages/ingredient/ui/IngredientPage"
import ScrollToTop from "../widgets/ScrollToTop"
import CocktailDetailPage from "../pages/cocktailDetail/ui/CocktailDetailPage"
import MyBarPage from "../pages/myBar/ui/MyBarPage"
import IngredientDetailPage from "../pages/ingredientDetail/ui/IngredientDetailPage"
import SearchPage from "../pages/search/ui/SearchPage"
import FilteredCocktailPage from "../pages/filteredCocktail/ui/FilteredCocktailPage"

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktail" element={<Cocktail />} />
        <Route path="/ingredient" element={<Ingredient />} />
        <Route
          path="/ingredient/:idIngredient"
          element={<IngredientDetailPage />}
        />
        <Route path="/cocktail/:idDrink" element={<CocktailDetailPage />} />
        <Route
          path="/cocktail/:filter/:pathFilterValue"
          element={<FilteredCocktailPage />}
        />
        <Route path="/search/:name" element={<SearchPage />} />
        <Route path="/mybar" element={<MyBarPage />} />
      </Routes>
      <BottomNavbar />
    </BrowserRouter>
  )
}

export default Router
