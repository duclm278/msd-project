import { StyledEngineProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </StyledEngineProvider>
);
