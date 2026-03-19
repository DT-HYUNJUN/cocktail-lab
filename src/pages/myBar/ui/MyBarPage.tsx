import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import MyBarList from "./MyBarList"
import IngredList from "./IngredList"
import { useMyBarStore } from "../../../app/store"
import styled from "styled-components"
import { backgroundColor } from "../../../shared/color/color"

const MyBarPage = () => {
  const [tabValue, setTabValue] = useState(1)

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const myBarList = useMyBarStore(state => state.myBarList)

  return (
    <div>
      <FixedTab>
        <Tabs
          sx={{ borderBottom: "1px solid #DEDEDE" }}
          value={tabValue}
          onChange={handleChangeTab}
          variant="fullWidth"
        >
          <Tab label={`마이 바 (${myBarList.length})`} />
          <Tab label="재료" />
        </Tabs>
      </FixedTab>
      <ListContainer>
        {tabValue === 0 && <MyBarList />}
        {tabValue === 1 && <IngredList />}
      </ListContainer>
    </div>
  )
}

export default MyBarPage

const FixedTab = styled.div`
  position: fixed;
  top: 48px;
  width: 480px;
  z-index: 100;
  background-color: ${backgroundColor};

  @media (max-width: 480px) {
    width: 100%;
  }
`
const ListContainer = styled("div")({
  marginTop: 48,
})
