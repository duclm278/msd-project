import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import { deepmerge } from "@mui/utils";
import { useContext, useEffect, useState } from "react";
import "./App.css";
import { SideDrawerContext } from "./components/SideDrawer";
import Router from "./routes";
import joyTheme from "./themes/joyTheme";
import muiTheme from "./themes/muiTheme";
import { UserContext } from "./contexts/UserProvider";
import Loading from "./components/Loading";
import employeeApi from "./api/employeeApi";
import authentication from "./utils/authentication";
import status from "./constants/status";

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);

            const auth = JSON.parse(localStorage.getItem("login"));
            if (!auth) {
                if (window.location.pathname !== "/login")
                    window.location.pathname = "/login";
            }

            try {
                const response = await employeeApi.getEmployeeById(
                    authentication.getUserId()
                );

                if (response?.data?.type === status.success) {
                    setUser(response?.data?.employee);
                }
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };

        fetch();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="app">
            <CssVarsProvider
                disableTransitionOnChange
                theme={deepmerge(muiTheme, joyTheme)}
            >
                <SideDrawerContext.Provider
                    value={{ drawerOpen, setDrawerOpen }}
                >
                    <CssBaseline />
                    <Router />
                </SideDrawerContext.Provider>
            </CssVarsProvider>
            {loading && <Loading />}
        </div>
    );
}

export default App;
