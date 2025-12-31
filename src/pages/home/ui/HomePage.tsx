import { Box, Container, styled } from "@mui/material"
import {
  CocktailCard,
  FilterCard,
  SectionTitle,
  LoadingCard,
} from "../../../shared/ui"
import { useQuery } from "@tanstack/react-query"
import { getRandomCocktail } from "../api/getRandomCocktail"
import { categoryList } from "../model/categoryList"

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getRandomCocktail"],
    queryFn: () => getRandomCocktail(),
    refetchOnWindowFocus: false,
  })

  return (
    <Container>
      <Section>
        <SectionTitle variant={"h5"} text={"랜덤 칵테일"} gutterBottom={true} />
        {isLoading ? (
          <LoadingCard />
        ) : (
          data && <CocktailCard cocktailCard={data.drinks[0]} />
        )}
      </Section>
      <Section>
        <FilterCard
          filterList={categoryList}
          filter="c"
          filterName="카테고리"
        />
      </Section>
    </Container>
  )
}

export default HomePage

const Section = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
})
