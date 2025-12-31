import { createTheme } from "@mui/material"

export const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo, NanumSquareNeoBold",
  },
  palette: {
    primary: {
      main: "#00CED1",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  shape: {
    borderRadius: 10,
  },
})
