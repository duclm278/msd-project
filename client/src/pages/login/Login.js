import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import { CssVarsProvider } from "@mui/joy/styles";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { CssBaseline } from "@mui/material";
import * as React from "react";
import Layout from "../../components/Layout";
import theme from "../../theme";

const Login = () => {
  return (
    <CssVarsProvider disableTransitionOnChange theme={theme}>
      <CssBaseline />
      <Layout.Main>
        <Sheet
          sx={{
            width: 450,
            mx: "auto", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              Welcome!
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <TextField
            // html input attribute
            name="email"
            type="email"
            placeholder="mail@example.com"
            // pass down to FormLabel as children
            label="Email"
          />
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
          />
          <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Don't have an account?
          </Typography>
        </Sheet>
      </Layout.Main>
    </CssVarsProvider>
  );
};

export default Login;
