import CocktailCard from "../components/Common/CocktailCard"
import { Box, Container, styled } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import { useParams } from "react-router-dom"
import HeadText from "../components/Common/HeadText"
import { useEffect } from "react"
import LoadingCard from "../components/Common/LoadingCard"
import { useInView } from "react-intersection-observer"
import { getByFilter } from "../features/cocktail/cocktailSlice"
import { filterData } from "../assets/data/filterData"

const FilteredCocktail = () => {
  const [ref, inView] = useInView()

  const { filter, pathFilterValue } = useParams() as {
    filter: "c" | "g" | "i" | "a"
    pathFilterValue: string
  }

  const drinkList = useAppSelector(
    (state: RootState) => state.cocktail.cocktailList,
  )
  const loading = useAppSelector((state: RootState) => state.cocktail.loading)
  const count = useAppSelector((state: RootState) => state.cocktail.count)
  const selectedFilterValue = useAppSelector(
    (state: RootState) => state.cocktail.selectedFilterValue,
  )
  const selectedFilter = useAppSelector(
    (state: RootState) => state.cocktail.selectedFilter,
  )
  const isEnd = useAppSelector((state: RootState) => state.cocktail.isEnd)

  const dispatch = useAppDispatch()

  const targetFilterValue = filterData[selectedFilter].filterList.find(
    item => item.value === pathFilterValue,
  )!

  useEffect(() => {
    if (selectedFilterValue !== pathFilterValue) {
      dispatch(
        getByFilter({
          filterValue: pathFilterValue,
          count: 0,
          reset: true,
          filter,
        }),
      )
    }
  }, [])

  useEffect(() => {
    if (count !== 0 && !isEnd && inView) {
      dispatch(
        getByFilter({
          filterValue: pathFilterValue,
          count,
          reset: false,
          filter,
        }),
      )
    }
  }, [inView])

  return (
    drinkList &&
    targetFilterValue && (
      <Container>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" pl={3} gap={2}>
            <IngredImage src={targetFilterValue.image} alt="image" />
            <HeadText
              variant="h6"
              text={`${targetFilterValue.filterValue} 칵테일`}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={6}
          >
            {loading
              ? [0, 1, 3].map(item => (
                  <div key={item}>
                    <LoadingCard />
                    <LoadingCard />
                    <LoadingCard />
                  </div>
                ))
              : drinkList.map(drink => (
                  <CocktailCard key={drink.idDrink} drink={drink} />
                ))}
            {isEnd && <HeadText text="끝" variant="h4" />}
          </Box>
        </Box>
        <div ref={ref} />
      </Container>
    )
  )
}

export default FilteredCocktail

const IngredImage = styled("img")({
  width: "40px",
})
