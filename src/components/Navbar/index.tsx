import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";

import GlobalContext from "@/context/GlobalContext";
import { ACTION_LOGOUT } from "@/constants";
import Logo from "@/components/Logo";
import AppIcon from "@/components/AppIcon";
import { green } from "@mui/material/colors";
import CustomLink from "@/components/CustomLink";
import { ROUTES } from "@/configs/routes";

export default function Navbar() {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  if (!context) return <></>;

  const { globalState, globalDispatch } = context;

  const handleLogout = () => {
    globalDispatch({ type: ACTION_LOGOUT });
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack direction="row" alignItems="center">
              <Logo />
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ display: { xs: "none", md: "flex" } }}
              >
                <CustomLink to={ROUTES.EXPLORE}>EXPLORE</CustomLink>
                <CustomLink to={ROUTES.FEED}>FEED</CustomLink>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {globalState.currentUser ? (
                <>
                  <Box component={CustomLink} to={ROUTES.PROFILE}>
                    <Avatar sx={{ bgcolor: green[500] }}>
                      {globalState.currentUser.name[0].toUpperCase()}
                    </Avatar>
                  </Box>
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <CustomLink to="/" onClick={handleLogout}>
                      LOGOUT
                    </CustomLink>
                  </Box>
                </>
              ) : (
                <CustomLink to={ROUTES.LOGIN}>LOGIN</CustomLink>
              )}
              <IconButton
                size="large"
                aria-label="hamburger"
                color="inherit"
                sx={{ display: { md: "none" } }}
              >
                <AppIcon name="menu" />
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
