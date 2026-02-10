import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

const IngredientCard = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "ingredients",
  })

  return <div>IngredientCard</div>
}

export default IngredientCard

const CardBox = styled("div")({})
