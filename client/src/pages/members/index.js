import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";

// Custom
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SelectFilter from "../../components/SelectFilter";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import MemberDialogAdd from "./MemberDialogAdd";
import TableView from "./TableView";

export const filterOpts = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function Members() {
    const { drawerOpen } = useContext(SideDrawerContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentOpt, setCurrentOpt] = useState(null);

    return (
        <>
            {drawerOpen && <SideDrawer />}
            <Layout.Root
                sx={{
                    ...(drawerOpen && {
                        height: "100vh",
                        overflow: "hidden",
                    }),
                }}
            >
                <Header />
                <Layout.SideNav>
                    <SideBar />
                </Layout.SideNav>
                <Layout.Main
                    sx={{
                        bgcolor: "background.surface",
                    }}
                >
                    <Box
                        sx={{
                            pt: 1,
                            bgcolor: "background.surface",
                            position: "sticky",
                            top: 64, // TODO: Fix hard code
                            zIndex: 1100,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                fontWeight="bold"
                                level="h3"
                                component="h1"
                            >
                                Members
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                my: 2,
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                gap: 1,
                                justifyContent: "space-between",
                            }}
                        >
                            <SelectFilter
                                filterOpt={currentOpt}
                                setFilterOpt={setCurrentOpt}
                                filterOpts={filterOpts}
                            />
                            <Button
                                startDecorator={<Add />}
                                onClick={() => setOpenAdd(true)}
                            >
                                Add member
                            </Button>
                            <MemberDialogAdd
                                open={openAdd}
                                setOpen={setOpenAdd}
                            />
                        </Box>
                        <TableView filterOpt={currentOpt} />
                    </Box>
                </Layout.Main>
            </Layout.Root>
        </>
    );
}
