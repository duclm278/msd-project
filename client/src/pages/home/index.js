import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import CircularProgress from "@mui/joy/CircularProgress";
// import Divider from "@mui/joy/Divider";
// import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

// Custom
import { useContext } from "react";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";
import SideDrawer, { SideDrawerContext } from "../../components/SideDrawer";

export default function Home() {
  const { drawerOpen } = useContext(SideDrawerContext);
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
          <Stack spacing={2}>
            <Typography fontWeight="bold" level="h3" component="h1">
              Home
            </Typography>
            <Typography fontWeight="bold" level="h5" component="h2">
              Which devices does this app support?
            </Typography>
            <Stack>
              <Box>
                Typically, there are four types of screen sizes that responsive
                design is tailored to smartphones and tablets including:
              </Box>
              <ul>
                <li>Tablets: 768-959 pixels</li>
                <li>Widescreen desktop: 1220 + pixels</li>
                <li>Smaller desktop (laptops): 960-1219 pixels</li>
                <li>Widescreen desktop: 1220+ pixels</li>
                <li>
                  Mobile phones: 480-767 pixels (wide), 479 or fewer pixels
                  (vertical)
                </li>
              </ul>
              <Box>
                Depending on the device you use, the content on the screen will
                shift around to best display the page. But saying that it shifts
                to fit the size of the device is putting it too simply. The
                reason it shifts is that it is a responsive layout or adaptive
                web design.
              </Box>
            </Stack>
          </Stack>
        </Layout.Main>
      </Layout.Root>
    </>
  );
}
