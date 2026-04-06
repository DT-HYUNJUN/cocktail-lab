import {
  Badge,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useEffect, useMemo, useRef, useState } from "react"
import type {
  IngredientCategory,
  IngredientFilterState,
  BaseSpiritGroup,
  FlavorProfile,
  AbvLevel,
  IngredientSortOption,
} from "../../../../entities/ingredient/model/localIngredient/ingredient.type"
import TuneIcon from "@mui/icons-material/Tune"
import {
  filterIngredients,
  getSelectedFilterCount,
  ingredientFilterOptions,
  initialFilterState,
} from "../../../../entities/ingredient/model/localIngredient/ingredient.filter"
import { aperolOrange } from "../../../../shared/color/color"
import IngredientCard from "./IngredientCard"
import {
  ingredientSortOptions,
  sortIngredients,
} from "../../../../entities/ingredient/model/localIngredient/ingredient.sort"
import FilterChip from "./FilterChip"
import { useIngredientStore } from "../../../../app/store"
import { ingredientData } from "../../../../entities/ingredient/model/localIngredient/ingredient.data"
import styled from "styled-components"

const IngredList = () => {
  const [open, setOpen] = useState(false)
  // 필터
  const [filters, setFilters] =
    useState<IngredientFilterState>(initialFilterState)
  // 정렬
  const [sortOption, setSortOption] = useState<IngredientSortOption>("NAME_ASC")
  const [openSort, setOpenSort] = useState(false)

  const {
    selectedFilters,
    updateSelectedFilters,
    isFromIngredient,
    updateIsFromIngredient,
  } = useIngredientStore()

  // 필터링 된 재료
  const filteredIngredients = useMemo(() => {
    return filterIngredients(ingredientData, filters)
  }, [filters])

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isFromIngredient.state) {
      // 이전 위치로 이동
      window.scrollTo(0, isFromIngredient.scrollY)
      setFilters(selectedFilters as IngredientFilterState)
      // 초기화
      updateSelectedFilters(initialFilterState)
      updateIsFromIngredient({ scrollY: 0, state: false })
    }
  }, [])

  // 카테고리 필터
  const toggleCategory = (category: IngredientCategory) => {
    setFilters(prev => {
      const exists = prev.categories.includes(category)

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category],
      }
    })
  }

  // 카테고리 필터
  const toggleAbvLevel = (abvLevel: AbvLevel) => {
    setFilters(prev => {
      const exists = prev.abvLevels.includes(abvLevel)

      return {
        ...prev,
        abvLevels: exists
          ? prev.abvLevels.filter(a => a !== abvLevel)
          : [...prev.abvLevels, abvLevel],
      }
    })
  }

  // 베이스 스피릿 필터
  const toggleSpirit = (spirit: BaseSpiritGroup) => {
    setFilters(prev => {
      const exists = prev.baseSpiritGroups.includes(spirit)

      return {
        ...prev,
        baseSpiritGroups: exists
          ? prev.baseSpiritGroups.filter(s => s !== spirit)
          : [...prev.baseSpiritGroups, spirit],
      }
    })
  }

  // 맛 필터
  const toggleFlavor = (flavor: FlavorProfile) => {
    setFilters(prev => {
      const exists = prev.flavors.includes(flavor)

      return {
        ...prev,
        flavors: exists
          ? prev.flavors.filter(f => f !== flavor)
          : [...prev.flavors, flavor],
      }
    })
  }

  // 카테고리 그룹 체크박스
  const toggleCategoryGroup = () => {
    setFilters(prev => {
      const allCategories = ingredientFilterOptions.categories.map(c => c.value)

      const isAllSelected = prev.categories.length === allCategories.length

      return {
        ...prev,
        categories: isAllSelected ? [] : allCategories,
      }
    })
  }

  // 도수 그룹 체크박스
  const toggleAbvLevelGroup = () => {
    setFilters(prev => {
      const all = ingredientFilterOptions.abvLevels.map(a => a.value)

      const isAllSelected = prev.abvLevels.length === all.length

      return {
        ...prev,
        abvLevels: isAllSelected ? [] : all,
      }
    })
  }

  // 베이스 그룹 체크박스
  const toggleSpiritGroup = () => {
    setFilters(prev => {
      const all = ingredientFilterOptions.baseSpiritGroup.map(s => s.value)

      const isAllSelected = prev.baseSpiritGroups.length === all.length

      return {
        ...prev,
        baseSpiritGroups: isAllSelected ? [] : all,
      }
    })
  }

  // 맛 그룹 체크박스
  const toggleFlavorGroup = () => {
    setFilters(prev => {
      const all = ingredientFilterOptions.flavors.map(f => f.value)

      const isAllSelected = prev.flavors.length === all.length

      return {
        ...prev,
        flavors: isAllSelected ? [] : all,
      }
    })
  }

  const resetFilters = () => {
    setFilters(initialFilterState)
  }

  const handleApplyFilter = () => {
    setOpen(false)
    updateSelectedFilters(filters)
  }

  const selectedFilterCount = useMemo(() => {
    return getSelectedFilterCount(filters)
  }, [filters])

  // 정렬
  const result = useMemo(() => {
    const filtered = filterIngredients(ingredientData, filters)
    const sorted = sortIngredients(filtered, sortOption)

    return sorted
  }, [ingredientData, filters, sortOption])

  const handleChangeSort = (sortOption: IngredientSortOption) => {
    setOpenSort(false)
    setSortOption(sortOption)
  }

  return (
    <div>
      <FilterHeader ref={filterRef}>
        <Badge badgeContent={selectedFilterCount} color="primary">
          <Chip
            icon={<TuneIcon />}
            variant="outlined"
            label="필터"
            clickable
            onClick={() => setOpen(true)}
          />
        </Badge>
      </FilterHeader>
      <ListContainer>
        <ListHeader>
          <Typography fontSize={14} variant="body2">
            총 {filteredIngredients.length}개
          </Typography>
          <SortButtonBox onClick={() => setOpenSort(true)}>
            <Typography variant="body2" fontSize={14} fontWeight={500}>
              이름순
            </Typography>
            <KeyboardArrowDownIcon fontSize="small" />
          </SortButtonBox>
        </ListHeader>
        <Grid container spacing={{ xs: 3, md: 6 }} rowSpacing={4}>
          {result.length === 0 ? (
            <EmptyResult>
              <Typography variant="body2">
                조건에 맞는 재료가 없습니다.
              </Typography>
              <Button onClick={resetFilters}>필터 초기화</Button>
            </EmptyResult>
          ) : (
            result.map(ingred => (
              <Grid size={{ xs: 6, md: 3 }} key={ingred.name}>
                <IngredientCard ingred={ingred} />
              </Grid>
            ))
          )}
        </Grid>
      </ListContainer>

      {/* 필터 */}
      <Drawer open={open} onClose={handleApplyFilter} anchor="bottom">
        <FilterDrawer>
          <DrawerBox>
            {/* 헤더 */}
            <HeaderBox>
              <LeftBox>
                <IconButton
                  size="small"
                  onClick={handleApplyFilter}
                  disableRipple
                >
                  <CloseIcon />
                </IconButton>
              </LeftBox>
              <CenterBox>
                <Typography variant="h5">필터</Typography>
              </CenterBox>
              <RightBox></RightBox>
            </HeaderBox>
            <ContentBox>
              {/* 카테고리 */}
              <FilterBox>
                <FilterTitle>
                  <Checkbox
                    disableRipple
                    icon={<DefaultIcon />}
                    checkedIcon={<CheckedIcon />}
                    checked={
                      filters.categories.length ===
                      ingredientFilterOptions.categories.length
                    }
                    onChange={toggleCategoryGroup}
                  />
                  <Typography variant="h6">카테고리</Typography>
                </FilterTitle>
                <FilterSelectBox>
                  {ingredientFilterOptions.categories.map(category => (
                    <FilterChip
                      key={category.value}
                      label={category.label}
                      filterCondition={filters.categories.includes(
                        category.value,
                      )}
                      handleClick={() => toggleCategory(category.value)}
                    />
                  ))}
                </FilterSelectBox>
              </FilterBox>
              <Divider />
              {/* 도수 */}
              <FilterBox>
                <FilterTitle>
                  <Checkbox
                    disableRipple
                    icon={<DefaultIcon />}
                    checkedIcon={<CheckedIcon />}
                    checked={
                      filters.abvLevels.length ===
                      ingredientFilterOptions.abvLevels.length
                    }
                    onChange={toggleAbvLevelGroup}
                  />
                  <Typography variant="h6">도수</Typography>
                </FilterTitle>
                <FilterSelectBox>
                  {ingredientFilterOptions.abvLevels.map(abv => (
                    <FilterChip
                      key={abv.value}
                      label={abv.label}
                      filterCondition={filters.abvLevels.includes(abv.value)}
                      handleClick={() => toggleAbvLevel(abv.value)}
                    />
                  ))}
                </FilterSelectBox>
              </FilterBox>
              <Divider />
              {/* 베이스 */}
              <FilterBox>
                <FilterTitle>
                  <Checkbox
                    disableRipple
                    icon={<DefaultIcon />}
                    checkedIcon={<CheckedIcon />}
                    checked={
                      filters.baseSpiritGroups.length ===
                      ingredientFilterOptions.baseSpiritGroup.length
                    }
                    onChange={toggleSpiritGroup}
                  />
                  <Typography variant="h6">베이스</Typography>
                </FilterTitle>
                <FilterSelectBox>
                  {ingredientFilterOptions.baseSpiritGroup.map(spirit => (
                    <FilterChip
                      key={spirit.value}
                      label={spirit.label}
                      filterCondition={filters.baseSpiritGroups.includes(
                        spirit.value,
                      )}
                      handleClick={() => toggleSpirit(spirit.value)}
                    />
                  ))}
                </FilterSelectBox>
              </FilterBox>
              <Divider />
              {/* 맛 */}
              <FilterBox>
                <FilterTitle>
                  <Checkbox
                    disableRipple
                    icon={<DefaultIcon />}
                    checkedIcon={<CheckedIcon />}
                    checked={
                      filters.flavors.length ===
                      ingredientFilterOptions.flavors.length
                    }
                    onChange={toggleFlavorGroup}
                  />
                  <Typography variant="h6">맛</Typography>
                </FilterTitle>
                <FilterSelectBox>
                  {ingredientFilterOptions.flavors.map(flavor => (
                    <FilterChip
                      key={flavor.value}
                      label={flavor.label}
                      filterCondition={filters.flavors.includes(flavor.value)}
                      handleClick={() => toggleFlavor(flavor.value)}
                    />
                  ))}
                </FilterSelectBox>
              </FilterBox>
            </ContentBox>
            {/* 버튼 */}
            <ButtonBox>
              <Button variant="outlined" disableRipple onClick={resetFilters}>
                초기화
              </Button>
              <FilterApplyButton
                variant="contained"
                disableRipple
                onClick={handleApplyFilter}
              >
                {filteredIngredients.length}개 상품보기
              </FilterApplyButton>
            </ButtonBox>
          </DrawerBox>
        </FilterDrawer>
      </Drawer>

      {/* 정렬창 */}
      <Drawer
        open={openSort}
        onClose={() => setOpenSort(false)}
        anchor="bottom"
      >
        <SortDrawer>
          {ingredientSortOptions.map(option => (
            <SortOptionItem
              key={option.value}
              onClick={() => handleChangeSort(option.value)}
            >
              <div>
                {sortOption === option.value ? (
                  <CheckIcon color="primary" fontSize="small" />
                ) : (
                  ""
                )}
              </div>
              <Typography>{option.label}</Typography>
            </SortOptionItem>
          ))}
        </SortDrawer>
      </Drawer>
    </div>
  )
}

export default IngredList

const FilterHeader = styled("div")({
  display: "flex",
  justifyContent: "right",
  padding: "8px 16px",
  borderBottom: "1px solid #DEDEDE",
})

const FilterDrawer = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 82vh;
  padding-top: 20px;

  @media (min-width: 768px) {
    box-sizing: border-box;
    width: 100%;
    height: auto;
  }

  @media (min-width: 1920px) {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 0 500px;
  }
`

const DrawerBox = styled("div")({
  backgroundColor: "#FFF",
  width: "100%",
  "@media (min-width: 768px)": {},
})

const ButtonBox = styled("div")({
  backgroundColor: "#FFF",
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 8,
  padding: 12,
  height: 64,
})

const HeaderBox = styled("div")({
  boxSizing: "border-box",
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  alignItems: "center",
  backgroundColor: "#FFF",
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  paddingBottom: 12,
})

const LeftBox = styled("div")({
  display: "flex",
  justifyContent: "start",
  paddingLeft: 10,
})

const CenterBox = styled("div")({
  display: "flex",
  justifyContent: "center",
})

const RightBox = styled("div")({
  display: "flex",
  justifyContent: "end",
})

const FilterBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#F7F7F7",
})

const FilterSelectBox = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
})

const FilterTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
})

const DefaultIcon = styled("span")({
  borderRadius: "50%",
  width: 20,
  height: 20,
  backgroundColor: "#E4E8F0",
  backgroundImage:
    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23A3ABB7'/%3E%3C/svg%3E\")",
  content: '""',
})

const CheckedIcon = styled(DefaultIcon)({
  backgroundColor: aperolOrange[400],
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
})

const FilterApplyButton = styled(Button)({
  ":hover": {
    boxShadow: "none",
    backgroundColor: aperolOrange[400],
  },
})

const ListHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
})

const SortButtonBox = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
})

const SortDrawer = styled("div")({
  boxSizing: "border-box",
  padding: 20,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 40,
})

const SortOptionItem = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 11fr",
  alignItems: "center",
  cursor: "pointer",
  gap: 12,
})

const EmptyResult = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "50vh",
})

const ContentBox = styled("div")`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 12px;
  height: calc(82vh - 110px);
  overflow-x: hidden;
  overflow-y: auto;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  @media (min-width: 768px) {
    height: auto;
  }
`

const ListContainer = styled("div")({
  padding: "0 16px",
  "@media (min-width: 768px)": {
    padding: "0",
  },
})
