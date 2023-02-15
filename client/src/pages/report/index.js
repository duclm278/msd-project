import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";

// Icons
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

// Custom
import { useSnackbar } from "notistack";
import { createRef, useContext, useState } from "react";
import { CSVLink } from "react-csv";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";

const data = [
  {
    Date: "2021-01-01",
    Earned: 10000,
  },
  {
    Date: "2021-01-02",
    Earned: 3000,
  },
  {
    Date: "2021-01-03",
    Earned: 2000,
  },
  {
    Date: "2021-01-04",
    Earned: 2780,
  },
  {
    Date: "2021-01-05",
    Earned: 1890,
  },
  {
    Date: "2021-01-06",
    Earned: 2390,
  },
  {
    Date: "2021-01-07",
    Earned: 3490,
  },
  {
    Date: "2021-01-08",
    Earned: 3490,
  },
  {
    Date: "2021-01-09",
    Earned: 3490,
  },
  {
    Date: "2021-01-10",
    Earned: 3490,
  },
];

const orders = [];

export default function Report() {
  let today = new Date();
  let lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  today.setUTCHours(0, 0, 0, 0);
  lastMonth.setUTCHours(0, 0, 0, 0);
  today = today.toISOString().replace(/T.*$/, "");
  lastMonth = lastMonth.toISOString().replace(/T.*$/, "");
  console.log(today, lastMonth);
  const { drawerOpen } = useContext(SideDrawerContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [beginDate, setBeginDate] = useState(lastMonth);
  const [endDate, setEndDate] = useState(today);
  const { enqueueSnackbar } = useSnackbar();
  const csvLinkEl = createRef();

  const handleExport = () => {
    // TODO: Fetch orders from API
    csvLinkEl.current.link.click();
  };

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
                Report
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
              <Stack
                component="form"
                noValidate
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
              >
                <TextField
                  type="date"
                  value={beginDate}
                  onChange={(e) => setBeginDate(e.target.value)}
                />
                <TextField
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Stack>
              <Button
                startDecorator={<FileDownloadOutlinedIcon />}
                onClick={(e) => handleExport(e)}
              >
                Export report (.csv)
              </Button>
              <CSVLink
                data={orders}
                filename={`report-${beginDate}-${endDate}.csv`}
                style={{ display: "none" }}
                ref={csvLinkEl}
              />
            </Box>
            <Divider />
          </Box>
          {data.length > 0 ? (
            <Stack mt={2.5} spacing={3}>
              <Typography fontWeight="bold" level="h5" component="h2">
                Total Earned
              </Typography>
              <Box height={350}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Earned"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Stack>
          ) : (
            <Typography mt={2} fontWeight="bold" level="h5" component="h2">
              No records found!
            </Typography>
          )}
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
