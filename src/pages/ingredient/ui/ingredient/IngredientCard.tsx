import { Button, styled, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import { useTranslation } from "react-i18next"
import { useIngredientStore } from "../../../../app/store"
import { aperolOrange } from "../../../../shared/color/color"
import { useNavigate } from "react-router-dom"
import type { Ingredient } from "../../../../entities/ingredient/model/localIngredient/ingredient.type"

interface IngredientCardProps {
  ingred: Ingredient
}

const IngredientCard = ({ ingred }: IngredientCardProps) => {
  const navigate = useNavigate()

  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  const { t: f } = useTranslation("translation", {
    keyPrefix: "filter",
  })

  const { myIngredientList, updateMyIngredientList, updateIsFromIngredient } =
    useIngredientStore()

  const handleClickAdd = () => {
    updateMyIngredientList(ingred)
  }

  const isAdded = myIngredientList.some(
    ingredient => ingredient.name === ingred.name,
  )

  const handleClickCard = () => {
    updateIsFromIngredient({ scrollY: window.pageYOffset, state: true })
    navigate(`/ingredient/${ingred.name}`)
  }

  return (
    <CardBox>
      <ImageBox onClick={handleClickCard}>
        <IngredImage
          src={`https://www.thecocktaildb.com/images/ingredients/${ingred.name}-Medium.png`}
          alt={ingred.name}
        />
      </ImageBox>
      {isAdded ? (
        <CheckButton
          variant="outlined"
          size="small"
          onClick={handleClickAdd}
          startIcon={<CheckCircleOutlineIcon />}
        >
          추가됨
        </CheckButton>
      ) : (
        <AddButton
          variant="outlined"
          size="small"
          color="info"
          onClick={handleClickAdd}
          startIcon={<AddIcon />}
        >
          추가하기
        </AddButton>
      )}
      <Typography variant="body2">{t(`names.${ingred.name}`)}</Typography>
      <FilterLabelBox>
        {ingred.baseSpiritGroup ? (
          <FilterLabel>{f(`baseSpirit.${ingred.baseSpiritGroup}`)}</FilterLabel>
        ) : (
          <FilterLabel>{f(`category.${ingred.category}`)}</FilterLabel>
        )}

        {ingred.abv && <FilterLabel>{ingred.abv}도</FilterLabel>}
      </FilterLabelBox>
    </CardBox>
  )
}

export default IngredientCard

const CardBox = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: 8,
})

const ImageBox = styled("div")({
  position: "relative",
  backgroundColor: "#F7F7F7",
  width: "100%",
  aspectRatio: 1 / 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  cursor: "pointer",
})

const IngredImage = styled("img")({
  objectFit: "contain",
  width: "90%",
})

const AddButton = styled(Button)({
  borderRadius: 4,
})

const CheckButton = styled(Button)({
  borderRadius: 4,
})

const FilterLabelBox = styled("div")({
  display: "flex",
  gap: 4,
})

const FilterLabel = styled("div")({
  fontSize: 10,
  borderRadius: 4,
  backgroundColor: aperolOrange[400],
  color: "#FFF",
  padding: "2px 4px",

  "@media (min-width: 768px)": {
    fontSize: 12,
  },
})
