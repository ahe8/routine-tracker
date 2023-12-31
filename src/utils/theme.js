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
    dark: "#424242",
    darker: "#212121",
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

    //TextField
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-input": {
            color: theme.primary.font,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.secondary.dark,
            },
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.primary.font,
          },
          "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline":
            {
              borderColor: theme.primary.font,
            },
        }),
      },
    },
  },
});
