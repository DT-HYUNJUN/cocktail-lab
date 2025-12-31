import { Box, CircularProgress, Container, styled } from "@mui/material"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useQuery } from "@tanstack/react-query"
import getCocktailByFilter from "../api/getCocktailByFilter"
import { CocktailCard, SectionTitle } from "../../../shared/ui"

const FilteredCocktailPage = () => {
  const [ref, inView] = useInView()

  const { filter, pathFilterValue } = useParams() as {
    filter: "c" | "g" | "i" | "a"
    pathFilterValue: string
  }

  const { data: cocktailList, isLoading } = useQuery({
    queryKey: ["getCocktailByFilter", filter, pathFilterValue],
    queryFn: () => getCocktailByFilter(filter, pathFilterValue),
    enabled: !!filter && !!pathFilterValue,
  })

  // useEffect(() => {
  //   if (selectedFilterValue !== pathFilterValue) {
  //     dispatch(
  //       getByFilter({
  //         filterValue: pathFilterValue,
  //         count: 0,
  //         reset: true,
  //         filter,
  //       }),
  //     )
  //   }
  // }, [])

  // useEffect(() => {
  //   if (count !== 0 && !isEnd && inView) {
  //     dispatch(
  //       getByFilter({
  //         filterValue: pathFilterValue,
  //         count,
  //         reset: false,
  //         filter,
  //       }),
  //     )
  //   }
  // }, [inView])

  return isLoading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    cocktailList && (
      <Container>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" pl={3} gap={2}>
            {/* <IngredImage src={targetFilterValue.image} alt="image" /> */}
            {/* <SectionTitle
              variant="h6"
              text={`${targetFilterValue.filterValue} 칵테일`}
            /> */}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={6}
          >
            {cocktailList.map(cocktail => (
              <CocktailCard key={cocktail.idDrink} cocktailCard={cocktail} />
            ))}
            {/* {isEnd && <SectionTitle text="끝" variant="h4" />} */}
          </Box>
        </Box>
        <div ref={ref} />
      </Container>
    )
  )
}

export default FilteredCocktailPage

const IngredImage = styled("img")({
  width: "40px",
})
