import { createTheme } from "@mui/material/styles";

export const Colors = {
  primary: "#0276aa",
};

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
  },
});

export default theme;
