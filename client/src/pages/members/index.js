import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// Icons
import Add from "@mui/icons-material/Add";

// Custom
import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SelectFilter from "../../components/SelectFilter";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import MemberDialogAdd from "./MemberDialogAdd";
import TableView from "./TableView";
import status from "../../constants/status";
import Loading from "../../components/Loading";
import customerApi from "../../api/customerApi";
import { Input, Stack } from "@mui/joy";
import { useDebounce } from "../../hooks";

export const filterOpts = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function Members() {
    const { drawerOpen } = useContext(SideDrawerContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentOpt, setCurrentOpt] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            const rankIndex = filterOpts.findIndex(
                (item) => item === currentOpt
            );
            const response = await customerApi.searchByNameOrRank({
                name: debounceValue,
                rank: rankIndex !== -1 ? rankIndex + 1 : "",
            });

            if (response?.data?.type === status.success) {
                setData(response?.data?.customers);
            }
        } catch (err) {
            setData([]);
        }
        setLoading(false);
    };

    const debounceValue = useDebounce(search, 500);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [currentOpt, debounceValue]);

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
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={1.5}
                            >
                                <Input
                                    name="search"
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value.trim())
                                    }
                                    startDecorator={<SearchRoundedIcon />}
                                    sx={{ width: { md: 300 } }}
                                />
                                <SelectFilter
                                    filterOpt={currentOpt}
                                    setFilterOpt={setCurrentOpt}
                                    filterOpts={filterOpts}
                                />
                            </Stack>
                            <Button
                                startDecorator={<Add />}
                                onClick={() => setOpenAdd(true)}
                            >
                                Add member
                            </Button>
                            <MemberDialogAdd
                                open={openAdd}
                                setOpen={setOpenAdd}
                                setLoading={setLoading}
                                fetchData={fetchData}
                            />
                        </Box>
                        {loading && <Loading />}
                        {!loading && (
                            <>
                                {data.length === 0 ? (
                                    "No customer!"
                                ) : (
                                    <TableView
                                        data={data}
                                        setLoading={setLoading}
                                        fetchData={fetchData}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Layout.Main>
            </Layout.Root>
        </>
    );
}
