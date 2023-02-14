import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Icons
import Add from "@mui/icons-material/Add";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// Custom
import { useContext, useEffect, useState } from "react";
import customerApi from "../../api/customerApi";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import SelectFilter from "../../components/SelectFilter";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";
import status from "../../constants/status";
import MemberDialogAdd from "./MemberDialogAdd";
import TableView from "./TableView";

export const filterOpts = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function Members() {
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentOpt, setCurrentOpt] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [progressIcon, setProgressIcon] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const rankIndex = filterOpts.findIndex((item) => item === currentOpt);
      const response = await customerApi.searchByNameOrRank({
        name: "",
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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentOpt]);

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
                Members
              </Typography>
            </Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              sx={{ my: 2, gap: 2 }}
            >
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <Input
                  name="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  startDecorator={<SearchRoundedIcon />}
                  endDecorator={
                    progressIcon && (
                      <CircularProgress size="sm" color="primary" />
                    )
                  }
                  sx={{ width: { md: 165 } }}
                />
                <SelectFilter
                  filterOpt={currentOpt}
                  setFilterOpt={setCurrentOpt}
                  filterOpts={filterOpts}
                />
              </Stack>
              <Stack direction="row" spacing={{ xs: 1.5, sm: 2, md: 2 }}>
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
              </Stack>
            </Stack>
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
