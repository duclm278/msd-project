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
import SelectFilter from "../../components/SelectFilter";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import ComboDialogAdd from "./ComboDialogAdd";
import ComboGroup from "./ComboGroup";
import DiskDialogAdd from "./DiskDialogAdd";
import DiskGroup from "./DiskGroup";

export const comboOpt = "Combo";

export const diskOpts = [
  "Appetizer",
  "Breakfast",
  "Main Menu",
  "Dessert",
  "Beverage",
];

export const filterOpts = [comboOpt, ...diskOpts];

export default function Menu() {
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openDiskAdd, setOpenDiskAdd] = useState(false);
  const [openComboAdd, setOpenComboAdd] = useState(false);
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
              <Typography fontWeight="bold" level="h3" component="h1">
                Menu
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              sx={{ my: 2, gap: 2 }}
            >
              <SelectFilter
                filterOpt={currentOpt}
                setFilterOpt={setCurrentOpt}
                filterOpts={filterOpts}
              />
              <Stack direction="row" spacing={{ xs: 1.5, sm: 2, md: 2 }}>
                <Button
                  startDecorator={<Add />}
                  onClick={() => setOpenDiskAdd(true)}
                >
                  Add disk
                </Button>
                <DiskDialogAdd open={openDiskAdd} setOpen={setOpenDiskAdd} />
                <Button
                  startDecorator={<Add />}
                  onClick={() => setOpenComboAdd(true)}
                >
                  Add combo
                </Button>
                <ComboDialogAdd open={openComboAdd} setOpen={setOpenComboAdd} />
              </Stack>
            </Stack>
            <Divider />
          </Box>
          <Box px={0.25}>
            {currentOpt === null ? (
              filterOpts.map((filterOpt) =>
                filterOpt === comboOpt ? (
                  <ComboGroup key={filterOpt} />
                ) : (
                  <DiskGroup key={filterOpt} category={filterOpt} />
                )
              )
            ) : currentOpt === comboOpt ? (
              <ComboGroup key={currentOpt} />
            ) : (
              <DiskGroup key={currentOpt} category={currentOpt} />
            )}
          </Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
