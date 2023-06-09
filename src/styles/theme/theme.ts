import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const Colors = {
  primary: "#0276aa",
  // primary: "#ff0081",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
  },
});

export default responsiveFontSizes(theme);
