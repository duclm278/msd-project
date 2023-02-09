import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";

// Custom
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import Event from "./Event";
import EventDialogAdd from "./EventDialogAdd";
import eventApi from "../../api/eventApi";
import status from "../../constants/status";
import Loading from "../../components/Loading";

export default function Events() {
    const { drawerOpen } = useContext(SideDrawerContext);
    const [openAdd, setOpenAdd] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await eventApi.getListOfEvent();
            if (response?.data?.type === status.success) {
                setEvents(response.data?.events);
            }
        } catch (err) {
            setEvents([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                Events
                            </Typography>
                        </Box>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent="space-between"
                            sx={{ my: 2, gap: 2 }}
                        >
                            <Stack
                                direction="row"
                                spacing={{ xs: 1.5, sm: 2, md: 2 }}
                            >
                                <Button
                                    startDecorator={<Add />}
                                    onClick={() => setOpenAdd(true)}
                                >
                                    Add event
                                </Button>
                                <EventDialogAdd
                                    open={openAdd}
                                    setOpen={setOpenAdd}
                                    fetchData={fetchData}
                                    setLoading={setLoading}
                                />
                            </Stack>
                        </Stack>
                        <Divider />
                    </Box>
                    {loading && <Loading />}
                    {!loading && (
                        <Box
                            sx={{
                                my: 3,
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "repeat(auto-fill, minmax(160px, 1fr))",
                                    sm: "repeat(auto-fill, minmax(180px, 1fr))",
                                    md: "repeat(auto-fill, minmax(200px, 1fr))",
                                },
                                gap: 3,
                            }}
                        >
                            {events.length === 0
                                ? "No event!"
                                : events.map((event) => (
                                      <React.Fragment key={event.event_id}>
                                          <Event
                                              id={event.event_id}
                                              name={event.event_name}
                                              description={event.description}
                                              status={event.event_status}
                                              discount={event.discount}
                                              minCost={event.min_cost}
                                              beginTime={event.begin_time}
                                              endTime={event.end_time}
                                              poster={event.poster}
                                              setLoading={setLoading}
                                              fetchData={fetchData}
                                          />
                                      </React.Fragment>
                                  ))}
                        </Box>
                    )}
                </Layout.Main>
            </Layout.Root>
        </>
    );
}
