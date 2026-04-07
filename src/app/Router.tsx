import HomePage from "../pages/home/ui/HomePage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cocktail from "../pages/cocktail/ui/CocktailPage"
import ScrollToTop from "../widgets/ScrollToTop"
import CocktailDetailPage from "../pages/cocktailDetail/ui/CocktailDetailPage"
import IngredientDetailPage from "../pages/ingredientDetail/ui/IngredientDetailPage"
import SearchPage from "../pages/search/ui/SearchPage"
import MainLayout from "./layouts/MainLayout"
import IngredientPage from "../pages/ingredient/ui/IngredientPage"

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* 홈 */}
          <Route path="/" element={<HomePage />} />
          {/* 칵테일 */}
          <Route path="/cocktail" element={<Cocktail />} />
          <Route path="/cocktail/:idDrink" element={<CocktailDetailPage />} />
          {/* 재료 */}
          <Route path="/ingredient" element={<IngredientPage />} />
          <Route
            path="/ingredient/:strIngredient"
            element={<IngredientDetailPage />}
          />
          {/* 검색 */}
          <Route path="/search/:name" element={<SearchPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
