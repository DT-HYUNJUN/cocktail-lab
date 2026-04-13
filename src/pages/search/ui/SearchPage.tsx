import { Button, Chip, Divider, Grid, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import ingreds from "../../../shared/i18n/ko/translation.json"
import styled from "styled-components"
import { useRecentSearchStore } from "../../../app/store"
import { useQuery } from "@tanstack/react-query"
import getCocktailByName from "../api/getCocktailByName"
import CocktailCard from "../../../shared/ui/cocktail/CocktailCard"
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"
import { Loading } from "../../../shared/ui"
import getIngredientByName from "../api/getIngredientByName"
import IngredientSearchCard from "./IngredientSearchCard"

const engPattern = /[a-zA-Z]/

const SearchPage = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const {
    recentSearchValueList,
    deleteRecentSearchValueList,
    resetRecentSearchValueList,
  } = useRecentSearchStore()

  const { data, isFetching } = useQuery({
    queryKey: ["getCocktailByName", name],
    queryFn: () => getCocktailByName(checkName(name || "", "cocktail")),
    enabled: !!name,
  })

  const { data: iData, isFetching: iLoading } = useQuery({
    queryKey: ["getIngredientByName", name],
    queryFn: () => getIngredientByName(checkName(name || "", "cocktail")),
    enabled: !!name,
  })

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const checkName = (name: string, findValue: "ingredient" | "cocktail") => {
    if (engPattern.test(name)) {
      return name
    } else {
      if (name in ingreds.ingredients[`ko-${findValue}-names`]) {
        return t(`ko-${findValue}-names.${name}`)
      } else {
        return name
      }
    }
  }

  const handleDeleteSearchValue = (searchValue: string) => {
    deleteRecentSearchValueList(searchValue)
  }

  const handleClickRecentSearch = (searchValue: string) => {
    navigate(`/search/${searchValue}`)
  }

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [dragging, setDragging] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return

    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    setDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return

    e.preventDefault()

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  const handleMouseUp = () => {
    isDragging.current = false
    setDragging(false)
  }

  return (
    <div>
      <SearchSection>
        <RecentSearchHeader>
          <span>최근 검색어</span>
          <Button
            size="small"
            variant="text"
            onClick={resetRecentSearchValueList}
          >
            전체삭제
          </Button>
        </RecentSearchHeader>
        <RecentSearchList
          $dragging={dragging}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {recentSearchValueList.map(recentSearchValue => (
            <Chip
              key={recentSearchValue}
              label={recentSearchValue}
              variant="outlined"
              onMouseDown={e => e.stopPropagation()}
              onDelete={() => handleDeleteSearchValue(recentSearchValue)}
              onClick={() => handleClickRecentSearch(recentSearchValue)}
            />
          ))}
        </RecentSearchList>
      </SearchSection>
      <Divider />
      {iLoading && <Loading />}
      {iData && iData.ingredients && (
        <ResultSection>
          <Typography variant="h5">재료</Typography>
          <div>
            {iData.ingredients && (
              <Grid container spacing={{ xs: 3, md: 6 }}>
                {iData.ingredients.map(ingred => (
                  <Grid key={ingred.idIngredient} size={{ xs: 6, md: 3 }}>
                    <IngredientSearchCard name={ingred.strIngredient} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </ResultSection>
      )}
      <Divider />
      {isFetching && <Loading />}
      {data && data.drinks && (
        <ResultSection>
          <Typography variant="h5">칵테일</Typography>
          <div>
            {data.drinks && (
              <Grid container spacing={{ xs: 3, md: 6 }}>
                {data.drinks.map(drink => (
                  <Grid key={drink.idDrink} size={{ xs: 6, md: 3 }}>
                    <CocktailCard cocktail={drink} />
                  </Grid>
                ))}
              </Grid>
            )}
          </div>
        </ResultSection>
      )}
      {data?.drinks === null && iData?.ingredients === null && (
        <ResultBox>
          <ResultNameBox>
            <Typography color="primary" component="span" mr={1}>
              '{name}'
            </Typography>
            <Typography component="span">결과를 찾을 수 없어요.</Typography>
          </ResultNameBox>
          <Typography>
            정확한 검색을 원하실 경우 영어로 검색해주세요.
          </Typography>
        </ResultBox>
      )}
    </div>
  )
}

export default SearchPage

const SearchSection = styled("div")({
  paddingLeft: 16,
  paddingRight: 16,
})

const RecentSearchHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const RecentSearchList = styled("div")<{ $dragging?: boolean }>(
  ({ $dragging }) => ({
    display: "flex",
    gap: 8,
    paddingTop: 8,
    paddingBottom: 8,
    overflow: "auto",
    whiteSpace: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    cursor: $dragging ? "grabbing" : "grab",
  }),
)

const ResultSection = styled("section")({
  marginTop: 32,
  marginBottom: 32,
  paddingLeft: 16,
  paddingRight: 16,
})

const ResultBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginTop: 60,
})

const ResultNameBox = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
})
