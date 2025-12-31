import { Box, Container } from "@mui/material"
import { useState } from "react"
import MenuBar from "../../../widgets/MenuBar"
import MyBarList from "./MyBarList"
import IngredList from "./IngredList"
import { useCocktail } from "../../../app/store"

const MyBarPage = () => {
  const [isClickedMyBarList, setIsClickedMyBarList] = useState(true)

  const myBar = useCocktail(state => state.myBar)

  const updateMyBar = useCocktail(state => state.updateMyBar)

  const handleClickMyBarList = () => {
    setIsClickedMyBarList(true)
  }

  const handleClickIngredList = () => {
    setIsClickedMyBarList(false)
  }

  const handleClickIngredient = (strIngredient: string) => {
    updateMyBar(strIngredient)
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <MenuBar
          value={isClickedMyBarList}
          handleClickOne={handleClickMyBarList}
          handleClickTwo={handleClickIngredList}
          text={{ one: `마이 바 (${myBar.length})`, two: "재료" }}
        />
        {isClickedMyBarList ? (
          <MyBarList />
        ) : (
          <IngredList
            handleClickIngredient={handleClickIngredient}
            checkMyBar={true}
          />
        )}
      </Box>
    </Container>
  )
}

export default MyBarPage
