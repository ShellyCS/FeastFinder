import { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { emailRegex, passwordRegex } from "../../utils";
import { postRequest } from "../../api";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../../utils/UserSlice";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import GoogleIcon from "@mui/icons-material/Google";
const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useTheme();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLoginApi = async ({ email, password, fromGoogleAuth }) => {
    const data = await postRequest({
      currentRoute: "/login",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        email,
        password,
        fromGoogleAuth,
      },
    });
    if (data.error) {
      enqueueSnackbar(data.error, { variant: "error" });
      dispatch(logoutUser({ loggedIn: false }));
    } else if (data.token) {
      enqueueSnackbar(`Welcome ${data.firstName} ${data.lastName}`, {
        variant: "success",
      });
      dispatch(
        loginUser({
          firstName: data.firstName,
          lastName: data.lastName,
          token: data.token,
          loggedIn: true,
          email: data.email,
        })
      );
      navigate("/");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await handleLoginApi({
        email: user.email,
        password: user.uid,
        fromGoogleAuth: true,
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleLogin = async () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const newErrors = { email: "", password: "" };
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Minimum 8 characters and should contain upper, lower, capital letters and a special character";
    }
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      await handleLoginApi({ email, password });
    }
  };
  return (
    <Grid
      container
      direction={"row"}
      spacing={2}
      style={{
        padding: "0px 20px",
        height: "calc(100vh - 90px)",
      }}
      alignItems={"center"}
    >
      <Grid container justifyContent={"center"} alignItems={"center"}>
        <Grid item xs={11} sm={7} md={5} lg={4}>
          <Grid
            container
            direction={"column"}
            justifyContent={"flex-start"}
            spacing={1}
          >
            <Grid item>
              <Typography variant="h5" color={"primary"} fontWeight={600}>
                Login
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Login to complete your meal.!
              </Typography>
            </Grid>
            <Grid item>
              <Textfield
                inputRef={emailRef}
                fullWidth
                label="Email"
                type="text"
                required
                placeholder="Enter the email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item>
              <Textfield
                inputRef={passwordRef}
                fullWidth
                type="password"
                label="Password"
                required
                placeholder="Enter the email"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item>
                  <Button variant="contained" onClick={handleLogin}>
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider>Or</Divider>
            </Grid>
            <Grid item>
              <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Grid item>Didn't have an account</Grid>
                <Grid item>
                  <Link
                    to="/signup"
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    {" "}
                    SignUp
                  </Link>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleGoogleLogin}
                    color="primary"
                  >
                    <Grid container spacing={1}>
                      <Grid item>
                        <GoogleIcon />
                      </Grid>
                      <Grid item>Login with Google</Grid>
                    </Grid>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
