import {
  Box,
  CardActionArea,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import type { FilterList } from "../model/filterData"
import SectionTitle from "./SectionTitle"

interface FilterCardProps {
  filterList: FilterList[]
  filter: "c" | "i" | "g" | "a"
  filterName: string
}

const FilterCard = ({ filterList, filter, filterName }: FilterCardProps) => {
  const navigate = useNavigate()

  const handleClickFilter = (value: string) => {
    navigate(`/cocktail/${filter}/${value}`)
  }

  return (
    <Box mt={4}>
      <SectionTitle text={filterName} gutterBottom={true} />
      <Grid container spacing={2}>
        {filterList.map(ingred => (
          <Grid width="120px" key={ingred.value} item xs={6}>
            <CardActionArea onClick={() => handleClickFilter(ingred.value)}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Box display="flex" alignItems="center">
                  <IngredImage src={ingred.image} alt="ingred" />
                  <Typography
                    fontFamily="NanumSquareNeoBold"
                    textAlign="center"
                    flexGrow={1}
                  >
                    {ingred.filterValue}
                  </Typography>
                </Box>
              </Paper>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FilterCard

const IngredImage = styled("img")({
  width: "40px",
})
