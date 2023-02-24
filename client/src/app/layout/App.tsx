import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import Catalog from "../../features/catalog/Catalog";
import { Header } from "./Header";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletterType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletterType,
      background: {
        default: paletterType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
