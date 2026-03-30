import { Button, Chip, Container, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import ingreds from "../../../shared/i18n/ko/translation.json"
import styled from "styled-components"
import { useRecentSearchStore } from "../../../app/store"
import { useQuery } from "@tanstack/react-query"
import getCocktailByName from "../api/getCocktailByName"
import Loading from "../../../shared/ui/Loading"
import CocktailCard from "../../../shared/ui/cocktail/CocktailCard"
import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"

const engPattern = /[a-zA-Z]/

const SearchPage = () => {
  const { name } = useParams()
  const navigate = useNavigate()

  const {
    recentSearchValueList,
    deleteRecentSearchValueList,
    resetRecentSearchValueList,
  } = useRecentSearchStore()

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["getCocktailByName", name],
    queryFn: () => getCocktailByName(checkName(name || "", "cocktail")),
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
    <Container>
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
      <ResultSection>
        <div>
          {isLoading ? (
            <Loading />
          ) : data?.drinks ? (
            <CocktailList>
              {data.drinks.map(drink => (
                <CocktailCard key={drink.idDrink} cocktail={drink} />
              ))}
            </CocktailList>
          ) : (
            isSuccess && (
              <ResultBox>
                <ResultNameBox>
                  <Typography color="primary" component="span" mr={1}>
                    '{name}'
                  </Typography>
                  <Typography component="span">
                    결과를 찾을 수 없어요.
                  </Typography>
                </ResultNameBox>
                <Typography>
                  정확한 검색을 원하실 경우 영어로 검색해주세요.
                </Typography>
              </ResultBox>
            )
          )}
        </div>
      </ResultSection>
    </Container>
  )
}

export default SearchPage

const SearchSection = styled("div")({
  marginTop: 20,
})

const RecentSearchHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 20,
})

const RecentSearchList = styled("div")<{ $dragging?: boolean }>(
  ({ $dragging }) => ({
    display: "flex",
    gap: 8,
    paddingTop: 12,
    paddingBottom: 12,
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
})

const CocktailList = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
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
