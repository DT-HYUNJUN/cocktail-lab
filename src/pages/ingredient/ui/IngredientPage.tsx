import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import IngredList from "./ingredient/IngredList"
import { useIngredientStore } from "../../../app/store"
import styled from "styled-components"
import { backgroundColor } from "../../../shared/color/color"
import MyIngredientList from "./myIngredient/MyIngredientList"

const IngredientPage = () => {
  const [tabValue, setTabValue] = useState(1)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const myIngredientList = useIngredientStore(state => state.myIngredientList)

  return (
    <div>
      <FixedTab>
        <Tabs value={tabValue} onChange={handleChangeTab} variant="fullWidth">
          <Tab label={`나의 재료 (${myIngredientList.length})`} />
          <Tab label="재료" />
        </Tabs>
      </FixedTab>
      <ListContainer>
        {tabValue === 0 && <MyIngredientList />}
        {tabValue === 1 && <IngredList />}
      </ListContainer>
    </div>
  )
}

export default IngredientPage

const FixedTab = styled.div`
  border-bottom: 1px solid #dedede;
  position: fixed;
  top: 40px;
  width: 100%;
  z-index: 100;
  background-color: ${backgroundColor};

  @media (min-width: 768px) {
    position: unset;
  }
`
const ListContainer = styled("div")`
  margin-top: 42px;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`
