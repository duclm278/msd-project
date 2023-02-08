import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { useContext, useState } from "react";

import employeeApi from "../../api/employeeApi";
import status from "../../constants/status";
import authentication from "../../utils/authentication";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserProvider";
import Loading from "../../components/Loading";

export default function Login() {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      setError("Email or password is empty!");
      return;
    }

    setLoading(true);
    try {
      const response = await employeeApi.login({ email, password });
      if (response?.data?.type === status.success) {
        authentication.login(response?.data?.employee.employee_id);
        setUser(response?.data?.employee);
        setLoading(false);
        navigate("/home");
      }
    } catch (err) {
      if (err.response?.data?.type === status.error) {
        setError(err.response?.data?.message);
      }
      setLoading(false);
    }
  };

  const handleLoginEnter = (e) => {
    if (e.key === "Enter") login();
  };

  const handleLogin = () => {
    login();
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {loading && <Loading />}
        {!loading && (
          <div onKeyDown={handleLoginEnter}>
            <Sheet
              variant="outlined"
              sx={{
                width: 450,
                mx: "auto",
                my: 4,
                py: 3,
                px: 2,
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
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  value={email}
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              {error && <span className="text-red-600">{error}</span>}
              <Button onClick={() => handleLogin()}>Log in</Button>
              <Typography
                endDecorator={<Link href="/signup">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: "center" }}
              >
                Don't have an account?
              </Typography>
            </Sheet>
          </div>
        )}
      </Box>
    </>
  );
}
