import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
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
import Table from "./Table";
import TableDialogAdd from "./TableDialogAdd";

export const filterOpts = ["Available", "Reserved", "Occupied", "Out of Order"];

export default function Tables() {
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [filterOpt, setFilterOpt] = useState(null);

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
                Tables
              </Typography>
            </Box>
            <Box
              sx={{
                my: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SelectFilter
                filterOpt={filterOpt}
                setFilterOpt={setFilterOpt}
                filterOpts={filterOpts}
              />
              <Button startDecorator={<Add />} onClick={() => setOpenAdd(true)}>
                Add table
              </Button>
              <TableDialogAdd open={openAdd} setOpen={setOpenAdd} />
            </Box>
            <Divider />
          </Box>
          <Box
            sx={{
              mt: 3,
              px: 0.25,
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(160px, 1fr))",
                sm: "repeat(auto-fill, minmax(180px, 1fr))",
                md: "repeat(auto-fill, minmax(200px, 1fr))",
              },
              gap: 3,
            }}
          >
            {[...Array(12).keys()].map((index) => (
              <div key={index}>
                <Table id="01" numberOfSeats={4} tableStatus={filterOpts[0]} />
              </div>
            ))}
          </Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
