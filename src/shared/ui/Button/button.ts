import type { Components, Theme } from "@mui/material"

export const MuiButton: Components<Theme>["MuiButton"] = {
  defaultProps: {
    disableRipple: true,
  },

  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: "none",
      // borderRadius: 12,
      fontWeight: 500,
      boxShadow: "none",
      minHeight: 40,

      "&.Mui-disabled": {
        opacity: 0.5,
      },
    }),

    sizeSmall: {
      padding: "4px 12px",
      fontSize: "12px",
      minHeight: 32,
    },

    sizeMedium: {
      padding: "8px 16px",
      fontSize: "14px",
      minHeight: 40,
    },

    sizeLarge: {
      padding: "12px 20px",
      fontSize: "16px",
      minHeight: 48,
    },
  },
}
