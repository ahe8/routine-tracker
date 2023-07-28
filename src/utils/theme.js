import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
  // Color
  primary: {
    background: "#1a1a1a",
    lighter: "#cdc5e5",
    light: "#8d7ac3",
    standard: "#5D43A9",
    dark: "#3d3191",
    font: "#FFF",
  },
  secondary: {
    light: "#d5dae7",
    standard: "#9296a3",
    dark: "#565a66",
    darker: "",
  },

  //Button
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.primary.light,
          borderColor: theme.primary.light,
          "&:hover": {
            color: theme.primary.dark,
            backgroundColor: theme.primary.light,
            borderColor: theme.primary.light,
          },
        }),
      },
    },
  },
});
