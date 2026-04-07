import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material"
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { CocktailCard } from "../../../shared/ui"
import getIngredientById from "../api/getIngredientById"
import getCocktailsByIngredient from "../api/getCocktailsByIngredient"
import { aperolOrange } from "../../../shared/color/color"
import { useEffect, useState } from "react"
import type { Ingredient } from "../../../entities/ingredient/model/localIngredient/ingredient.type"
import { ingredientData } from "../../../entities/ingredient/model/localIngredient/ingredient.data"

const borderRadius = 20

const IngredientDetailPage = () => {
  const { strIngredient } = useParams()
  const [localIngredientData, setLocalIngredientData] =
    useState<Ingredient | null>()

  const {
    data: ingredient,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ["getIngredientById"],
    queryFn: () => {
      if (!strIngredient) {
        throw new Error("idDrink is required")
      }
      return getIngredientById(strIngredient)
    },
    enabled: !!strIngredient,
  })

  const { data: cocktailList, isFetching: isFetchingCocktail } = useQuery({
    queryKey: ["getCocktailsByIngredient"],
    queryFn: () => {
      if (!strIngredient) {
        throw new Error("ingredient is required")
      }
      return getCocktailsByIngredient(strIngredient)
    },
    select: data => {
      if (typeof data === "string") {
        return []
      }
      return data
    },
    enabled: !!strIngredient,
  })

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const { t: f } = useTranslation("translation", {
    keyPrefix: "filter",
  })

  useEffect(() => {
    if (isSuccess) {
      const ingredientTemp = ingredientData.find(
        i =>
          i.name.toLocaleLowerCase() ===
          ingredient.strIngredient.toLocaleLowerCase(),
      )
      setLocalIngredientData(ingredientTemp ?? null)
    }
  }, [ingredient, isSuccess])

  return isFetching ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    ingredient && (
      <div>
        <IngredientBox>
          <ImageBox>
            <IngredientImage
              src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`}
            />
          </ImageBox>
          <Typography variant="h4">
            {localIngredientData?.name
              ? t(`names.${localIngredientData.name}`)
              : t(`names.${ingredient.strIngredient}`)}
          </Typography>
        </IngredientBox>
        <Divider />
        {localIngredientData ? (
          <>
            <InformationWrapper>
              <HeaderText>재료 정보</HeaderText>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <InformationBox>
                    <IconBox>
                      <LocalFireDepartmentOutlinedIcon color="primary" />
                    </IconBox>
                    <InformationLabel>도수</InformationLabel>
                    <InformationValue>
                      {localIngredientData.abv ?? 0}
                    </InformationValue>
                  </InformationBox>
                </Grid>
                <Grid size={4}>
                  <InformationBox>
                    <IconBox>
                      <AutoAwesomeOutlinedIcon color="primary" />
                    </IconBox>
                    <InformationLabel>맛</InformationLabel>
                    <InformationValue>
                      {f(`flavors.${localIngredientData.flavorProfile[0]}`)}
                    </InformationValue>
                  </InformationBox>
                </Grid>
                <Grid size={4}>
                  <InformationBox>
                    <IconBox>
                      <LiquorOutlinedIcon color="primary" />
                    </IconBox>
                    <InformationLabel>종류</InformationLabel>
                    <InformationValue>
                      {f(`category.${localIngredientData.category}`)}
                    </InformationValue>
                  </InformationBox>
                </Grid>
                {localIngredientData.flavorProfile.length > 1 && (
                  <Grid size={12}>
                    <FlavorProfileBox>
                      <Typography fontWeight={700} fontSize={14}>
                        맛 프로필
                      </Typography>
                      <FlavorList>
                        {localIngredientData.flavorProfile.map(flavor => (
                          <FlavorChip key={flavor}>
                            {f(`flavors.${flavor}`)}
                          </FlavorChip>
                        ))}
                      </FlavorList>
                    </FlavorProfileBox>
                  </Grid>
                )}
              </Grid>
            </InformationWrapper>
            <Divider />
          </>
        ) : (
          <>
            <InformationWrapper>
              <HeaderText>재료 정보</HeaderText>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <InformationBox>
                    <IconBox>
                      <LocalFireDepartmentOutlinedIcon color="primary" />
                    </IconBox>
                    <InformationLabel>도수</InformationLabel>
                    <InformationValue>
                      {ingredient.strAlcohol === "No"
                        ? "0"
                        : ingredient.strABV ?? "?"}
                    </InformationValue>
                  </InformationBox>
                </Grid>
                <Grid size={6}>
                  <InformationBox>
                    <IconBox>
                      <LiquorOutlinedIcon color="primary" />
                    </IconBox>
                    <InformationLabel>종류</InformationLabel>
                    <InformationValue>
                      {ingredient.strType
                        ? t(`types.${ingredient.strType}`)
                        : "기타"}
                    </InformationValue>
                  </InformationBox>
                </Grid>
              </Grid>
            </InformationWrapper>
            <Divider />
          </>
        )}

        {cocktailList && cocktailList.length > 0 && (
          <RelatedCocktailList>
            <HeaderText>
              이 재료로 만드는 칵테일{" "}
              <Typography fontSize={14} component="span" fontWeight={700}>
                ({cocktailList.length})
              </Typography>
            </HeaderText>
            <Grid container spacing={{ xs: 3, md: 6 }}>
              {cocktailList.map(cocktail => (
                <Grid key={cocktail.idDrink} size={{ xs: 6, md: 3 }}>
                  <CocktailCard cocktail={cocktail} />
                </Grid>
              ))}
            </Grid>
          </RelatedCocktailList>
        )}
      </div>
    )
  )
}

export default IngredientDetailPage

const ImageBox = styled("div")({
  backgroundColor: "#F7F7F7",
  width: 200,
  height: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: borderRadius,

  "@media (min-width: 768px)": {
    width: 400,
    height: 400,
  },
})

const IngredientImage = styled("img")({
  width: 180,
  height: 180,
  "@media (min-width: 768px)": {
    width: 380,
    height: 380,
  },
})

const IngredientBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 16,
  gap: 16,
})

const InformationWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  padding: 16,
})

const InformationBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 24,
  padding: 16,
  backgroundColor: "#F7F7F7",
  borderRadius: borderRadius,
})

const IconBox = styled("div")({
  padding: 12,
  backgroundColor: aperolOrange[50],
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})

const InformationLabel = styled(Typography)({
  fontSize: 12,
})

const InformationValue = styled(Typography)({
  fontSize: 14,
  fontWeight: 700,
})

const HeaderText = styled(Typography)({
  fontSize: 16,
  fontWeight: 700,
})

const FlavorProfileBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 24,
  padding: 16,
  backgroundColor: "#F7F7F7",
  borderRadius: borderRadius,
})

const FlavorList = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 8,
})

const FlavorChip = styled("div")({
  backgroundColor: aperolOrange[50],
  fontSize: 14,
  borderRadius: 24,
  padding: "6px 12px",
})

const RelatedCocktailList = styled("div")({
  marginTop: 16,
  display: "flex",
  flexDirection: "column",
  gap: 16,
  paddingLeft: 16,
  paddingRight: 16,
})
