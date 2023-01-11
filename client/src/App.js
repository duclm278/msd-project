import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { useState } from "react";
import "./App.css";
import { SideDrawerContext } from "./components/SideDrawer";
import Router from "./routes";
import theme from "./theme";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="app">
      <CssVarsProvider disableTransitionOnChange theme={theme}>
        <SideDrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
          <CssBaseline />
          <Router />
        </SideDrawerContext.Provider>
      </CssVarsProvider>
    </div>
  );
}

export default App;
