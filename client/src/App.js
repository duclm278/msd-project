import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { deepmerge } from "@mui/utils";
import { useState } from "react";
import "./App.css";
import { SideDrawerContext } from "./components/SideDrawer";
import Router from "./routes";
import joyTheme from "./themes/joyTheme";
import muiTheme from "./themes/muiTheme";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="app">
      <CssVarsProvider
        disableTransitionOnChange
        theme={deepmerge(muiTheme, joyTheme)}
      >
        <SideDrawerContext.Provider value={{ drawerOpen, setDrawerOpen }}>
          <CssBaseline />
          <Router />
        </SideDrawerContext.Provider>
      </CssVarsProvider>
    </div>
  );
}

export default App;
