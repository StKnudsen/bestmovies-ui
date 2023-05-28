import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

const NavigationBar = () => {
  const auth = getAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth={"xl"}>
          <Toolbar>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2, color: "white" }}
              >
                <TheatersIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                color="white"
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Best Movies
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1 }} />

            {auth.currentUser ? (
              <Link
                to={"/profile"}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton color="inherit" sx={{ mr: 2, color: "white" }}>
                  <AccountCircle />
                  <Typography
                    variant="body1"
                    noWrap
                    color="white"
                    component="div"
                    ml={1}
                  >
                    Profile
                  </Typography>
                </IconButton>
              </Link>
            ) : (
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton color="inherit" sx={{ mr: 2, color: "white" }}>
                  <AccountCircle />
                  <Typography
                    variant="body1"
                    noWrap
                    color="white"
                    component="div"
                    ml={1}
                  >
                    Login
                  </Typography>
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
