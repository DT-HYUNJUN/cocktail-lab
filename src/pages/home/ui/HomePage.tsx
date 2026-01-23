import { Button, Chip, Container, styled, Typography } from "@mui/material"
// import { CocktailCard } from "../../../shared/ui"
import { useQuery } from "@tanstack/react-query"
import { getRandomCocktail } from "../api/getRandomCocktail"
import RandomCard from "./RandomCard"
import { useRandomCocktailStore } from "../../../app/store"
import { useEffect, useState } from "react"
import { categoryList } from "../model/categoryList"
import type { GetCocktailByFilterPayload } from "../model/types"
import getCocktailByFilter from "../api/getCocktailByFilter"
import Loading from "../../../shared/ui/Loading"
import CocktailCard from "./CocktailCard"
import { aperolOrange } from "../../../shared/color/color"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  const [filterPayload, setFilterPayload] =
    useState<GetCocktailByFilterPayload>({
      filter: "c",
      filterValue: "Ordinary_Drink",
    })
  const [currentCategory, setCurrentCategory] = useState("ordinary_drink")

  const { randomCocktail, updateRandomCocktail } = useRandomCocktailStore()

  const {
    data,
    isFetching: isFetchingRandom,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["getRandomCocktail"],
    queryFn: () => getRandomCocktail(),
    refetchOnWindowFocus: false,
    enabled: !randomCocktail,
  })

  const { data: filterCocktailList, isFetching } = useQuery({
    queryKey: ["getCocktailByFilter", filterPayload],
    queryFn: () => getCocktailByFilter(filterPayload),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isSuccess && data) {
      console.log("update")
      updateRandomCocktail({
        idDrink: data.drinks[0].idDrink,
        strDrink: data.drinks[0].strDrink,
        strDrinkThumb: data.drinks[0].strDrinkThumb,
        strTags: data.drinks[0].strTags,
      })
    }
  }, [isSuccess, data])

  const handleChangeFilter = (filterValue: string) => {
    setFilterPayload({
      filter: "c",
      filterValue,
    })
    setCurrentCategory(filterValue)
  }

  const handleClickMore = () => {
    navigate(`/cocktail/c/${currentCategory}`)
  }

  return (
    <Container>
      <RandomCocktailSection>
        <TitleBox>
          <Typography variant="h4">오늘의 추천</Typography>
          <Button
            variant="text"
            size="small"
            onClick={() => refetch()}
            disabled={isFetchingRandom}
          >
            새로고침
          </Button>
        </TitleBox>
        {randomCocktail && (
          <RandomCard
            randomCocktail={randomCocktail}
            isFetching={isFetchingRandom}
          />
        )}
      </RandomCocktailSection>
      <CategorySection>
        <Typography variant="h4">카테고리</Typography>
        <CategoryMenu>
          {categoryList.map(category =>
            category.filterValue === currentCategory ? (
              <SelectedChip
                clickable
                color="primary"
                key={category.filterValue}
                label={category.filterName}
                onClick={() => handleChangeFilter(category.filterValue)}
              />
            ) : (
              <Chip
                clickable
                color="primary"
                key={category.filterValue}
                label={category.filterName}
                onClick={() => handleChangeFilter(category.filterValue)}
              />
            ),
          )}
        </CategoryMenu>

        <CategoryList>
          {isFetching ? (
            <Loading />
          ) : (
            filterCocktailList &&
            filterCocktailList.slice(0, 10).map(cocktail => (
              // <CocktailCard key={cocktail.strDrink} cocktailCard={cocktail} />
              <CocktailCard key={cocktail.strDrink} cocktail={cocktail} />
            ))
          )}
          {isFetching || (
            <MoreButton
              variant="contained"
              disableFocusRipple
              onClick={handleClickMore}
            >
              {`${
                categoryList.find(
                  category => category.filterValue === currentCategory,
                )?.filterName
              } 칵테일 더보기 (${filterCocktailList?.length}개)`}
            </MoreButton>
          )}
        </CategoryList>
      </CategorySection>
    </Container>
  )
}

export default HomePage

const RandomCocktailSection = styled("section")({
  marginBottom: 60,
})

const CategorySection = styled("section")({
  display: "flex",
  flexDirection: "column",
  gap: 12,
})

const TitleBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
})

const CategoryMenu = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
})

const CategoryList = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
})

const SelectedChip = styled(Chip)({
  color: "#FFF",
  backgroundColor: aperolOrange[400],
})

const MoreButton = styled(Button)({
  gridColumn: "1 / -1",
})
