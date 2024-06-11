import "./App.css"
import Home from "./pages/Home"
import { ThemeProvider, createTheme, styled } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import DrinkDetail from "./pages/CocktailDetail"
import BaseIngredDrinks from "./pages/FilteredCocktail"
import CocktailSearch from "./pages/CocktailSearch"
import Navbar from "./components/Common/Navbar"
import BottomNavbar from "./components/Common/BottomNavbar"
import MyBar from "./pages/MyBar"
import Cocktail from "./pages/Cocktail"
import Ingredient from "./pages/Ingredient"
import IngredientDetail from "./pages/IngredientDetail"
import SignUp from "./pages/Auth/SignUp"
import SignIn from "./pages/Auth/SignIn"

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo, NanumSquareNeoBold",
  },
  palette: {
    primary: {
      main: "#00CED1",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrap>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/cocktail" element={<Cocktail />} />
            <Route path="/ingredient" element={<Ingredient />} />
            <Route
              path="/ingredient/:strIngredient"
              element={<IngredientDetail />}
            />
            <Route path="/cocktail/detail/:idDrink" element={<DrinkDetail />} />
            <Route
              path="/cocktail/:filter/:pathFilterValue"
              element={<BaseIngredDrinks />}
            />
            <Route path="/search/:name" element={<CocktailSearch />} />
            <Route path="/mybar" element={<MyBar />} />
          </Routes>
          <BottomNavbar />
        </BrowserRouter>
      </Wrap>
    </ThemeProvider>
  )
}

export default App

const Wrap = styled("div")({
  position: "relative",
  maxWidth: "430px",
  minHeight: "100dvh",
  margin: "0 auto",
  boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  paddingTop: "100px",
  paddingBottom: "100px",
  backgroundColor: "white",
})
