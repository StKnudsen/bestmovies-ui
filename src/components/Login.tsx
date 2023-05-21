/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/require-await
  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        navigate("/profile");
      })
      .catch((error) => {
        setAuthing(false);
      });
  };

  return (
    <Container maxWidth="xs" sx={{ pt: 8 }}>
      <Card>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{ mt: 3, mb: 2, px: 8 }}
              fullWidth
              disabled={authing}
              onClick={() => signInWithGoogle()}
            >
              Sign in with google
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default Login;
