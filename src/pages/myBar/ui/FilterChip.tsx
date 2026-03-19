import { Chip } from "@mui/material"
import { aperolOrange } from "../../../shared/color/color"

interface FilterChipProps {
  label: string
  filterCondition: boolean
  handleClick: () => void
}

const FilterChip = ({
  label,
  filterCondition,
  handleClick,
}: FilterChipProps) => {
  return (
    <Chip
      label={label}
      clickable
      variant="outlined"
      onClick={handleClick}
      color={filterCondition ? "primary" : "default"}
      sx={{
        borderColor: "#ECECEC",
        ":hover": {
          color: filterCondition ? aperolOrange[400] : "#000",
        },
      }}
    />
  )
}

export default FilterChip
