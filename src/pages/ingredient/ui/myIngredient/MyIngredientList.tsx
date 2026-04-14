import { Grid, Typography } from "@mui/material"
import { useIngredientStore } from "../../../../app/store"
import IngredientCard from "../ingredient/IngredientCard"
import styled from "styled-components"
import { useEffect } from "react"

const MyIngredientList = () => {
  const { myIngredientList } = useIngredientStore()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MyIngredientListBox>
      <Grid container spacing={2} rowSpacing={3}>
        {myIngredientList.length === 0 ? (
          <EmptyList>
            <Typography variant="body2">
              내가 가진 재료들을 추가해보세요!
            </Typography>
          </EmptyList>
        ) : (
          myIngredientList.map(ingred => (
            <Grid key={ingred.name} size={{ xs: 6, sm: 3 }}>
              <IngredientCard ingred={ingred} />
            </Grid>
          ))
        )}
      </Grid>
    </MyIngredientListBox>
  )
}

export default MyIngredientList

const MyIngredientListBox = styled("div")({
  paddingTop: 20,
  paddingLeft: 16,
  paddingRight: 16,
})

const EmptyList = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "50vh",
})
