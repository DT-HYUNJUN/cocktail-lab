import { useEffect } from "react"
import { Box, Container } from "@mui/material"
import RecipeCard from "../components/Common/CocktailCard"
import { getRandomCocktail } from "../features/cocktail/cocktailSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import LoadingCard from "../components/Common/LoadingCard"
import HeadText from "../components/Common/HeadText"
import FilterCard from "../components/Common/FilterCard"
import { filterData } from "../assets/data/filterData"

const Home = () => {
  const dispatch = useAppDispatch()

  const randomDrink = useAppSelector(
    (state: RootState) => state.cocktail.randomCocktail,
  )

  const loading = useAppSelector((state: RootState) => state.cocktail.loading)

  useEffect(() => {
    dispatch(getRandomCocktail())
  }, [])

  return (
    <Container>
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <HeadText variant={"h5"} text={"랜덤 칵테일"} gutterBottom={true} />
        {loading ? <LoadingCard /> : <RecipeCard drink={randomDrink} />}
        <FilterCard filterData={filterData.c} filter="c" />
      </Box>
    </Container>
  )
}

export default Home
