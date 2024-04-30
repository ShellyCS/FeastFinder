import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Popper from "@mui/material/Popper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  commonRoutes,
  privateRouteList,
  publicRoutes,
} from "../../routes/routelist";
import { logoutUser } from "../../utils/slices/UserSlice";
import logo from "../../assets/applogo.png";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const items = useSelector((state) => state.cart.items);
  const itemsCount = items.length;
  const userLoggedIn = user.loggedIn && user.email;

  const handleLogoutPopper = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    setOpen((prev) => !prev);
    dispatch(logoutUser({ loggedIn: false }));
    enqueueSnackbar(`Successfully Logged Off`, {
      variant: "success",
    });
  };
  const handleRouteChange = (path) => {
    navigate(path);
  };
  useEffect(() => {
    if (userLoggedIn && location.pathname === "/login") {
      navigate("/");
    }
  }, [location.pathname]);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    return () => {};
  }, [token]);
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      justifyContent={"space-around"}
      style={{
        background: theme.palette.background.default,
        padding: "10px 20px 10px 10px",
      }}
    >
      <Grid item xs={6}>
        <img src={logo} alt="logo" width={60} height={"auto"} />
      </Grid>
      <Grid item xs={6}>
        <Grid container justifyContent={"flex-end"} spacing={1}>
          {commonRoutes.map(({ path, label, disableInNavbar }) => {
            if (disableInNavbar) {
              return true;
            }
            return (
              <Grid item>
                <Button
                  color={location.pathname === path ? "primary" : "secondary"}
                  onClick={() => handleRouteChange(path)}
                >
                  {label}
                </Button>
              </Grid>
            );
          })}
          {userLoggedIn ? (
            <React.Fragment>
              {privateRouteList.map(({ path, label, disableInNavbar }) => {
                if (disableInNavbar) {
                  return true;
                }
                if (label === "Cart") {
                  return (
                    <Grid item>
                      <Button
                        color={
                          location.pathname === path ? "primary" : "secondary"
                        }
                        onClick={() => handleRouteChange(path)}
                      >
                        <Badge
                          badgeContent={itemsCount}
                          color={
                            location.pathname === path ? "primary" : "secondary"
                          }
                        >
                          <ShoppingCartIcon />
                        </Badge>
                      </Button>
                    </Grid>
                  );
                }
                return (
                  <Grid item>
                    <Button
                      color={
                        location.pathname === path ? "primary" : "secondary"
                      }
                      onClick={() => handleRouteChange(path)}
                    >
                      {label}
                    </Button>
                  </Grid>
                );
              })}
              <Grid item>
                <Button
                  style={{
                    cursor: "pointer",
                    fontSize: "12px",
                    marginTop: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  variant="contained"
                  onClick={handleLogoutPopper}
                >
                  <Typography
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    {user.firstName}
                  </Typography>
                  <AccountCircleIcon
                    style={{
                      marginLeft: "5px",
                      fontSize: "15px",
                    }}
                  />
                </Button>
                <Popper
                  sx={{ zIndex: 1200 }}
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ marginTop: "5px" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Fade>
                  )}
                </Popper>
              </Grid>
            </React.Fragment>
          ) : (
            publicRoutes.map(({ path, label, disableInNavbar }) => {
              if (disableInNavbar) {
                return true;
              }
              return (
                <Grid item>
                  <Button
                    color={location.pathname === path ? "primary" : "secondary"}
                    onClick={() => handleRouteChange(path)}
                  >
                    {label}
                  </Button>
                </Grid>
              );
            })
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Navbar;
