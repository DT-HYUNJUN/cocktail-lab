import { Box, Container, IconButton, styled } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import LinkIcon from "@mui/icons-material/Link"
import { useQuery } from "@tanstack/react-query"
import { getCocktailById } from "../api/getCocktailById"
import { aperolOrange } from "../../../shared/color/color"
import { Loading } from "../../../shared/ui"

const CocktailDetailPage = () => {
  const { idDrink } = useParams()

  const { data: cocktail, isLoading } = useQuery({
    queryKey: ["getCocktailById", idDrink],
    queryFn: () => {
      if (!idDrink) {
        throw new Error("idDrink is required")
      }
      return getCocktailById(idDrink)
    },
    enabled: !!idDrink,
  })

  const navigate = useNavigate()

  const handleClickIngredient = (strIngredient: string) => {
    navigate(`/ingredient/${strIngredient}`)
  }

  const handleClickShare = (idDrink: string, strDrink: string) => {
    if (navigator.share) {
      navigator.share({
        title: strDrink,
        url: `https://cacaktail.netlify.app/cocktail/detail/${idDrink}`,
      })
    } else {
      alert("공유하기가 지원되지 않는 환경입니다.")
    }
  }

  const ingredients = Array.from({ length: 15 }, (_, i) => {
    if (cocktail) {
      const ingredient =
        cocktail[`strIngredient${i + 1}` as keyof typeof cocktail]
      const measure = cocktail[`strMeasure${i + 1}` as keyof typeof cocktail]

      if (!ingredient) {
        return null
      }

      return { ingredient, measure }
    }
  })

  return isLoading ? (
    <Loading />
  ) : (
    cocktail && (
      <Container>
        <Wrapper>
          {/* 칵테일 이미지 */}
          <ImageSection>
            <DrinkImage src={cocktail.strDrinkThumb} />
          </ImageSection>

          <ContentSection>
            {/* 칵테일 정보 */}
            <div>
              {cocktail.strTags && (
                <TagBox>
                  {cocktail.strTags.split(",").map(tag => (
                    <Tag key={tag}>{tag.toUpperCase()}</Tag>
                  ))}
                </TagBox>
              )}
              <CocktailNameBox>
                <CocktailName>{cocktail.strDrink}</CocktailName>
                <IconButton
                  onClick={() =>
                    handleClickShare(cocktail.idDrink, cocktail.strDrink)
                  }
                  size="small"
                  color="primary"
                >
                  <LinkIcon fontSize="small" />
                </IconButton>
              </CocktailNameBox>
              <CategoryWrapper>
                <CategoryBox>
                  <CategoryImage>
                    <span>🍸</span>
                  </CategoryImage>
                  <CategoryContentBox>
                    <CategoryContentTitle>글래스</CategoryContentTitle>
                    <CategoryContentSubTitle>
                      {cocktail.strGlass}
                    </CategoryContentSubTitle>
                  </CategoryContentBox>
                </CategoryBox>
              </CategoryWrapper>
            </div>

            {/* 재료 */}
            <IngredientSection>
              <TitleBox>
                <SectionTitle>재료</SectionTitle>
              </TitleBox>
              <ListWrapper>
                <IngredientList>
                  {ingredients.map(
                    ingred =>
                      ingred && (
                        <IngredientListItem key={ingred.ingredient}>
                          <IngredientImageBox
                            onClick={() =>
                              handleClickIngredient(ingred.ingredient)
                            }
                          >
                            <IngredImage
                              src={`https://www.thecocktaildb.com/images/ingredients/${ingred.ingredient}-Small.png`}
                              alt={ingred.ingredient}
                            />
                            <IngredientContentText>
                              {ingred.ingredient}
                            </IngredientContentText>
                          </IngredientImageBox>
                          <IngredientMeasuerText>
                            {ingred.measure}
                          </IngredientMeasuerText>
                        </IngredientListItem>
                      ),
                  )}
                </IngredientList>
              </ListWrapper>
            </IngredientSection>

            {/* 레시피 */}
            <div>
              <SectionTitle>만드는 방법</SectionTitle>
              <ListWrapper>
                <RecipeList>
                  {cocktail.strInstructions.split(/[.!]/).map(
                    (inst, index) =>
                      inst && (
                        <RecipeListItem key={inst}>
                          <RecipeListIndex>{index + 1}</RecipeListIndex>
                          <RecipeText>{inst}</RecipeText>
                        </RecipeListItem>
                      ),
                  )}
                </RecipeList>
              </ListWrapper>
            </div>
          </ContentSection>
        </Wrapper>
      </Container>
    )
  )
}

export default CocktailDetailPage

const DrinkImage = styled("img")`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  box-shadow: rgb(0 0 0 / 0.25) 0 25px 50px -12px;

  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`

const IngredImage = styled("img")({
  width: 32,
  height: 32,
  marginRight: 4,
})

const ImageSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const ContentSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
})

const TagBox = styled(Box)({
  marginBottom: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
})

const Tag = styled("span")({
  color: aperolOrange[400],
  backgroundColor: aperolOrange[50],
  borderRadius: 50,
  padding: "4px 12px",
  fontWeight: 700,
  fontSize: 12,
})

const CocktailName = styled("h1")({
  fontFamily: "NanumSquareNeoHeavy",
  fontSize: 30,
  margin: 0,
})

const CategoryWrapper = styled("div")({
  display: "flex",
  gap: 8,
})

const CategoryBox = styled("div")({
  display: "flex",
  gap: 8,
})

const CategoryImage = styled("div")({
  backgroundColor: aperolOrange[50],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  width: 40,
  height: 40,
})

const CategoryContentBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingTop: 1,
  paddingBottom: 1,
})

const CategoryContentTitle = styled("span")({
  fontSize: 12,
  color: "oklch(.5 .03 260)",
})

const CategoryContentSubTitle = styled("span")({
  fontSize: 12,
  color: "oklch(.12 .02 260)",
  fontWeight: 700,
})

const IngredientSection = styled("div")({
  marginBottom: 24,
})

const SectionTitle = styled("h2")({
  marginBottom: 16,
  fontWeight: 700,
})

const ListWrapper = styled("div")({
  borderRadius: 24,
  padding: 20,
  boxShadow:
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  backgroundColor: "#FFF",
})

const IngredientList = styled("ul")({
  listStyle: "none",
  padding: 0,
})

const IngredientListItem = styled("li")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
  paddingBottom: 12,
  borderBottom: "1px solid  oklch(.92 .01 260)",
})

const IngredientImageBox = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
})

const IngredientContentText = styled("span")({
  fontSize: 14,
  fontFamily: "NanumSquareNeoBold",
})

const IngredientMeasuerText = styled("span")({
  fontSize: 14,
  fontFamily: "NanumSquareNeoHeavy",
  color: aperolOrange[400],
  fontWeight: 700,
  wordSpacing: 6,
})

const RecipeList = styled("ol")({
  padding: 0,
  listStyle: "none",
})

const RecipeListItem = styled("li")({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 16,
})

const RecipeListIndex = styled("span")({
  backgroundColor: aperolOrange[400],
  color: "#FFF",
  borderRadius: "50%",
  minWidth: 32,
  height: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 700,
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  fontSize: 12,
})

const CocktailNameBox = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 24,
})

const RecipeText = styled("span")({
  fontFamily: "NanumSquareNeoBold",
  fontSize: 14,
  fontWeight: 700,
})

const TitleBox = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: start;
    gap: 80px;
  }
`
