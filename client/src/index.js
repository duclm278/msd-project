import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider } from "@mui/joy";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <StyledEngineProvider injectFirst>
        <BrowserRouter>
            <UserProvider>
                <App />
            </UserProvider>
        </BrowserRouter>
    </StyledEngineProvider>
);
