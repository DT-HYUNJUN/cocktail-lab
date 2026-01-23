import { createTheme } from "@mui/material"
import { palette } from "../shared/theme/palette"
import { MuiButton } from "../shared/ui/Button/button"
import { aperolOrange } from "../shared/color/color"

export const theme = createTheme({
  typography: {
    fontFamily: "Pretendard",
    h1: { fontSize: "32px", fontWeight: 700, lineHeight: 1.25 },
    h2: { fontSize: "28px", fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: "24px", fontWeight: 600, lineHeight: 1.35 },
    h4: { fontSize: "20px", fontWeight: 500, lineHeight: 1.4 },
    h5: { fontSize: "18px", fontWeight: 500, lineHeight: 1.45 },
    h6: { fontSize: "16px", fontWeight: 500, lineHeight: 1.5 },
  },
  palette,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton,
    MuiContainer: {
      styleOverrides: {
        maxWidthSm: {
          padding: "0px 16px",
        },
        maxWidthXs: {
          padding: "0px 16px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: aperolOrange[400],
          backgroundColor: aperolOrange[50],
          borderRadius: 50,
          padding: "4px 12px",
          fontWeight: 700,
        },
        sizeSmall: {
          fontSize: "0.75rem",
          height: 20,
        },
        label: {
          padding: 0,
        },
        clickable: {
          backgroundColor: "#fcf2f0",
          ":hover": {
            backgroundColor: aperolOrange[100],
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "rgb(0 0 0 / 0.25) 0 25px 50px -12px ",
          overflow: "hidden",
          ":hover": {
            ".MuiTypography-root": {
              color: aperolOrange[400],
            },
            ".MuiCardMedia-img": {
              transform: "scale(1.2)",
              transitionDuration: 700,
            },
          },
        },
      },
    },
  },
})
