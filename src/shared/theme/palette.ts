import type { PaletteOptions } from "@mui/material"
import { aperolOrange, curasoBlue } from "../color/color"

export const palette: PaletteOptions = {
  primary: {
    main: aperolOrange[400], // #FF6F2C
    dark: aperolOrange[700],
    light: aperolOrange[200],
    contrastText: "#fff",
  },
  secondary: {
    main: curasoBlue[400], // #3d5afe
    dark: curasoBlue[700],
    light: curasoBlue[200],
    contrastText: "#fff",
  },
  info: {
    main: "#4A4A4A",
  },
}
