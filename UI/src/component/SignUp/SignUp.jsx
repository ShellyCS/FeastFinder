import { useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Textfield from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { emailRegex, passwordRegex } from "../../utils";
import { postRequest } from "../../api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const email = emailRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    const newErrors = {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      confirmPassword: "",
    };

    if (firstName.length < 4) {
      newErrors.firstName = "First name characters > 3";
    }

    if (lastName.length < 4) {
      newErrors.lastName = "Last name characters > 3";
    }
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Minimum 8 characters and should contain upper, lower, capital letters and a special character";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      const data = await postRequest({
        currentRoute: "/signup",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          firstName,
          lastName,
          email,
          password,
        },
      });
      if (data.error) {
        enqueueSnackbar(data.error, { variant: "error" });
      } else if (data.message) {
        navigate("/login");
        enqueueSnackbar(data.message, {
          variant: "success",
        });
      }
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
                SignUp
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                SignUp to complete your meal.!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} direction={"row"}>
                <Grid item xs={6}>
                  <Textfield
                    inputRef={firstNameRef}
                    fullWidth
                    label="FirstName"
                    type="text"
                    required
                    placeholder="Enter the first name"
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Textfield
                    inputRef={lastNameRef}
                    fullWidth
                    label="LastName"
                    type="text"
                    required
                    placeholder="Enter the last name"
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
              </Grid>
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
                label="Create Password"
                required
                placeholder="Create the password"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid item>
              <Textfield
                inputRef={confirmPasswordRef}
                fullWidth
                type="password"
                label="Confirm Password"
                required
                placeholder="Confirm the password"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid item>
              <Grid container justifyContent={"center"} alignItems={"center"}>
                <Grid item>
                  <Button variant="contained" onClick={handleSignUp}>
                    SignUp
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
                <Grid item>Already have an account</Grid>
                <Grid item>
                  <Link
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    {" "}
                    Login
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
