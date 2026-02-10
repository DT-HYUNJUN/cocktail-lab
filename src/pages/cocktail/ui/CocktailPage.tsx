import { Container } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { aperolOrange } from "../../../shared/color/color"
import { cocktailFilterList } from "../model/filter"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { FilterValue } from "../model/types"
import { useQuery } from "@tanstack/react-query"
import getCocktailByFilter from "../api/getCocktailByFilter"
import Loading from "../../../shared/ui/Loading"
import CocktailCard from "../../home/ui/CocktailCard"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const CocktailPage = () => {
  const [currentFilter, setCurrentFilter] = useState<FilterValue>("c")
  const [currentFilterItemIndex, setCurrentFilterItemIndex] = useState(0)
  const [filterEffectPosition, setFilterEffectPosition] = useState<{
    left: number
    width: number
  } | null>(null)
  const [effectEnd, setEffectEnd] = useState(true)
  const [isExpand, setIsExpand] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const effectRef = useRef<HTMLDivElement | null>(null)

  const navigate = useNavigate()

  const { data: cocktails, isFetching } = useQuery({
    queryKey: ["getCocktailByFilter", currentFilter, currentFilterItemIndex],
    queryFn: () =>
      getCocktailByFilter({
        filter: currentFilter,
        filterItem: cocktailFilterList.find(
          filter => filter.value === currentFilter,
        )!.itemList[currentFilterItemIndex].value,
      }),
  })

  useLayoutEffect(() => {
    const index = cocktailFilterList.findIndex(f => f.value === currentFilter)
    const target = iconRefs.current[index]
    if (!target) return

    setFilterEffectPosition({
      left: target.offsetLeft,
      width: target.offsetWidth,
    })
  }, [])

  const handleClickFilter = (filter: FilterValue, index: number) => {
    setCurrentFilter(filter)
    setEffectEnd(false)

    const target = iconRefs.current[index]
    if (!target) return

    setFilterEffectPosition({
      left: target.offsetLeft,
      width: target.offsetWidth,
    })

    setCurrentFilterItemIndex(0)
  }

  const handleClickFilterItem = (index: number, filterItem: string) => {
    if (filterItem === "more") {
      navigate("/cocktail/ingredient")
    } else {
      setCurrentFilterItemIndex(index)
    }
  }

  const handleClickExpand = () => {
    setIsExpand(prev => !prev)
  }

  const formatImage = (ingredient: string) => {
    return `https://www.thecocktaildb.com/images/ingredients/${ingredient}-small.png`
  }

  return (
    <>
      <FilterMenu>
        {filterEffectPosition && (
          <FilterMenuIconEffect
            ref={effectRef}
            left={filterEffectPosition.left}
            width={filterEffectPosition.width}
            onTransitionEnd={() => setEffectEnd(true)}
          />
        )}
        {cocktailFilterList.map((filter, index) => (
          <FilterMenuIcon
            key={filter.value}
            ref={el => (iconRefs.current[index] = el)}
            selected={filter.value === currentFilter && effectEnd}
            onClick={() => handleClickFilter(filter.value, index)}
          >
            {filter.label}
          </FilterMenuIcon>
        ))}
      </FilterMenu>
      <FilterSection>
        <FilterCollapse expand={isExpand}>
          <FilterInner>
            {cocktailFilterList
              .find(f => f.value === currentFilter)!
              .itemList.map((item, index) => (
                <FilterBox key={item.value}>
                  <FilterIcon
                    selected={index === currentFilterItemIndex}
                    onClick={() => handleClickFilterItem(index, item.value)}
                  >
                    {currentFilter === "i" ? (
                      <FilterIngredImg
                        src={formatImage(item.value)}
                        alt={item.value}
                      />
                    ) : (
                      <FilterIconImg src={item.image} alt={item.value} />
                    )}
                  </FilterIcon>
                  <FilterIconLabel>{item.label}</FilterIconLabel>
                </FilterBox>
              ))}
          </FilterInner>
          {cocktailFilterList.find(f => f.value === currentFilter)!.itemList
            .length > 8 && (
            <ButtonBox onClick={handleClickExpand}>
              {isExpand ? <RemoveIcon /> : <AddIcon />}
            </ButtonBox>
          )}
        </FilterCollapse>
      </FilterSection>
      {isFetching ? (
        <Loading />
      ) : (
        cocktails && (
          <Container>
            <SearchBox>
              <SearchForm>
                <SearchIcon color="action" fontSize="small" />
                <SearchInput
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="칵테일을 검색해보세요"
                />
              </SearchForm>
            </SearchBox>
            <CocktailSection>
              {cocktails.filter(cocktail =>
                cocktail.strDrink.includes(searchValue),
              ).length ? (
                cocktails
                  .filter(cocktail => cocktail.strDrink.includes(searchValue))
                  .map(cocktail => (
                    <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
                  ))
              ) : (
                <InfoBox>찾으시는 칵테일이 없습니다.</InfoBox>
              )}
            </CocktailSection>
          </Container>
        )
      )}
    </>
  )
}

export default CocktailPage

const FilterSection = styled("section")({
  position: "relative",
  alignItems: "center",
  padding: "20px 24px",
  borderBottom: "1px solid #ebebeb",
})

const FilterCollapse = styled("div")<{ expand: boolean }>(({ expand }) => ({
  overflow: "hidden",
  maxHeight: expand ? 500 : 182,
  transition: "max-height 300ms ease-in-out",
}))

const FilterInner = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  rowGap: 24,
})

const FilterMenu = styled("div")({
  position: "sticky",
  top: 0,
  borderBottom: "1px solid #ebebeb",
  display: "flex",
  justifyContent: "space-evenly",
  paddingTop: 8,
  paddingBottom: 8,
  backgroundColor: "#FFF",
  zIndex: 100,
})

const FilterMenuIconEffect = styled("div")<{
  left: number
  width: number
}>`
  position: absolute;
  top: 8;
  left: ${({ left }) => left}px;
  width: ${({ width }) => width}px;
  height: 40px;
  border-radius: 24px;
  background-color: ${aperolOrange[700]};
  transition:
    left 300ms ease,
    width 300ms ease;
`

const FilterMenuIcon = styled("div")<{ selected: boolean }>`
  height: 40px;
  min-width: 60px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.selected ? "#FFF" : "#000")};
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  cursor: pointer;
  z-index: 10;
`

const FilterBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
})

const FilterIcon = styled("div")<{ selected: boolean }>`
  display: flex;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #dfdfdf;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border: 2px solid ${props => (props.selected ? aperolOrange[200] : "#DFDFDF")};
`

const FilterIconImg = styled("img")({
  width: 32,
  height: 32,
})

const FilterIngredImg = styled("img")({
  width: 36,
  height: 36,
})

const FilterIconLabel = styled("span")({
  fontSize: 14,
})

const CocktailSection = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 24,
  marginTop: 20,
})

const SearchBox = styled("div")({
  marginTop: 8,
  display: "flex",
  justifyContent: "right",
})

const SearchForm = styled("form")({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  padding: 8,
})

const SearchInput = styled("input")({
  background: "none",
  border: 0,
  outline: "none",
  width: "100%",
})

const InfoBox = styled("div")({
  gridColumn: "1 / -1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 40,
  color: aperolOrange[400],
  fontWeight: 700,
})

const ButtonBox = styled("div")({
  position: "absolute",
  right: 1,
  bottom: 1,
  cursor: "pointer",
  color: aperolOrange[700],
})
