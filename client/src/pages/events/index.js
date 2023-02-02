import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";

// Custom
import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import Event from "./Event";
import EventDialogAdd from "./EventDialogAdd";

export default function Events() {
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openAdd, setOpenAdd] = useState(false);

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
              <Typography fontWeight="bold" level="h3" component="h1">
                Events
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              sx={{ my: 2, gap: 2 }}
            >
              <Stack direction="row" spacing={{ xs: 1.5, sm: 2, md: 2 }}>
                <Button
                  startDecorator={<Add />}
                  onClick={() => setOpenAdd(true)}
                >
                  Add event
                </Button>
                <EventDialogAdd open={openAdd} setOpen={setOpenAdd} />
              </Stack>
            </Stack>
            <Divider />
          </Box>
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
            {[...Array(10).keys()].map((index) => (
              <React.Fragment key={index}>
                <Event
                  name="Magical July"
                  description="A magical journey to the land of the unknown..."
                  status="Due"
                  discount={50000}
                  beginTime="2022-07-01T00:00"
                  endTime="2022-07-31T00:00"
                  poster="https://images.unsplash.com/photo-1512058564366-18510be2db19?fm=jpg"
                />
              </React.Fragment>
            ))}
          </Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
