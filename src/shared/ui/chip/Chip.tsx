import { styled } from "@mui/material"
import { aperolOrange } from "../../color/color"

interface ChipProps {
  label: string
}

const Chip = ({ label }: ChipProps) => {
  return <ChipBox>{label}</ChipBox>
}

export default Chip

const ChipBox = styled("div")({
  color: aperolOrange[400],
  backgroundColor: aperolOrange[50],
  borderRadius: 50,
  padding: "4px 12px",
  fontWeight: 700,
  fontSize: "0.75rem",
  height: 20,
})
