import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircularProgress from "@mui/joy/CircularProgress";

// Custom
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import OrderDialogAdd from "./OrderDialogAdd";
import TableView from "./TableView";

export default function Orders() {
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [progressIcon, setProgressIcon] = useState(false);

  return (
    <>
      {drawerOpen && <SideDrawer />}
      <Layout.Root
        sx={{
          ...(drawerOpen && { height: "100vh", overflow: "hidden" }),
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
                Orders
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
              <Input
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                startDecorator={<SearchRoundedIcon />}
                endDecorator={
                  progressIcon && <CircularProgress size="sm" color="primary" />
                }
                sx={{ width: { md: 165 } }}
              />
              <Button startDecorator={<Add />} onClick={() => setOpenAdd(true)}>
                Add order
              </Button>
              <OrderDialogAdd open={openAdd} setOpen={setOpenAdd} />
            </Box>
            <TableView />
          </Box>
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
