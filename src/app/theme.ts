import { createTheme } from "@mui/material"
import { palette } from "../shared/theme/palette"
import { MuiButton } from "../shared/ui/Button/button"

export const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo, NanumSquareNeoBold",
  },
  palette,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton,
  },
})
