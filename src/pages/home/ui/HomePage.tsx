import { Button, Chip, Divider, Grid, styled, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getRandomCocktail } from "../api/getRandomCocktail"
import CocktailCardH from "../../../shared/ui/cocktail/CocktailCardH"
import { useRandomCocktailStore } from "../../../app/store"
import { useEffect, useState } from "react"
import { categoryList } from "../model/categoryList"
import type { GetCocktailByFilterPayload } from "../model/types"
import getCocktailByFilter from "../api/getCocktailByFilter"
import CocktailCard from "../../../shared/ui/cocktail/CocktailCard"
import { aperolOrange } from "../../../shared/color/color"

const HomePage = () => {
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

  return (
    <div>
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
          <CocktailCardH
            cocktail={randomCocktail}
            isFetching={isFetchingRandom}
          />
        )}
      </RandomCocktailSection>
      <Divider />
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
                variant="filled"
                color="primary"
                key={category.filterValue}
                label={category.filterName}
                onClick={() => handleChangeFilter(category.filterValue)}
              />
            ),
          )}
        </CategoryMenu>

        <CategoryList>
          <Grid container spacing={{ xs: 3, md: 6 }}>
            {filterCocktailList &&
              filterCocktailList.slice(0, 10).map(cocktail => (
                <Grid size={{ xs: 6, md: 3 }} key={cocktail.strDrink}>
                  {<CocktailCard cocktail={cocktail} />}
                </Grid>
              ))}
          </Grid>
        </CategoryList>
      </CategorySection>
    </div>
  )
}

export default HomePage

const RandomCocktailSection = styled("section")({
  marginBottom: 60,
  padding: "0 16px",
  "@media (min-width: 768px)": {
    padding: 0,
  },
})

const CategorySection = styled("section")({
  marginTop: 32,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  padding: "0 16px",
  "@media (min-width: 768px)": {
    padding: 0,
  },
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
  display: "flex",
  justifyContent: "center",
})

const SelectedChip = styled(Chip)({
  color: "#FFF",
  backgroundColor: aperolOrange[400],
})
