import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0C77E2", // Indigo
    },
    secondary: {
      main: "#FF7043", // Deep orange
    },
    background: {
      default: "#f7f9fc",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
