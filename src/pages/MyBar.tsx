import { Box, Container } from "@mui/material"
import IngredList from "../components/MyBar/IngredList"
import MyBarList from "../components/MyBar/MyBarList"
import { useState } from "react"
import MenuBar from "../components/Common/MenuBar"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import type { RootState } from "../app/store"
import { addToMyBar } from "../features/cocktail/cocktailSlice"
import { useNavigate } from "react-router-dom"
import User from "../components/Auth/User"

const MyBar = () => {
  const [isClickedMyBarList, setIsClickedMyBarList] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClickMyBarList = () => {
    setIsClickedMyBarList(true)
  }

  const handleClickIngredList = () => {
    setIsClickedMyBarList(false)
  }

  const handleClickIngredient = (strIngredient: string) => {
    dispatch(addToMyBar({ strIngredient }))
  }

  const count = useAppSelector(
    (state: RootState) => state.cocktail.myBar,
  ).length

  return (
    <Container>
      <User />
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <MenuBar
          value={isClickedMyBarList}
          handleClickOne={handleClickMyBarList}
          handleClickTwo={handleClickIngredList}
          text={{ one: `마이 바 (${count})`, two: "재료" }}
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

export default MyBar
