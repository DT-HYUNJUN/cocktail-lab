import { Grid, Typography } from "@mui/material"
import { useMyBarStore } from "../../../app/store"
import IngredientCard from "./IngredientCard"
import styled from "styled-components"

const MyBarList = () => {
  const { myBarList } = useMyBarStore()

  return (
    <MyBarListBox>
      <Grid container spacing={2} rowSpacing={3}>
        {myBarList.length === 0 ? (
          <EmptyList>
            <Typography variant="body2">
              내가 가진 재료들로 바를 채워보세요!
            </Typography>
          </EmptyList>
        ) : (
          myBarList.map(ingred => (
            <Grid key={ingred.name} size={{ xs: 6, sm: 3 }}>
              <IngredientCard ingred={ingred} />
            </Grid>
          ))
        )}
      </Grid>
    </MyBarListBox>
  )
}

export default MyBarList

const MyBarListBox = styled("div")({
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
