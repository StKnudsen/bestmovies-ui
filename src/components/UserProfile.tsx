/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";

const UserProfile = () => {
  const auth = getAuth();

  console.log(auth);

  return (
    <Container maxWidth="md" sx={{ pt: 8 }}>
      <Card sx={{ display: "flex" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="subtitle1">
              Welcome,
            </Typography>
            <Typography component="h1" variant="h5">
              {auth.currentUser?.displayName}
            </Typography>
            <Button
              sx={{ width: "16rem", mt: 2 }}
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => signOut(auth)}
            >
              Sign out
            </Button>
          </CardContent>
          <Typography component="div" variant="caption" sx={{ p: 2 }}>
            Signed in with google id: {auth.currentUser?.uid}
          </Typography>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={auth.currentUser?.photoURL}
          alt={auth.currentUser?.displayName}
        />
      </Card>
    </Container>
  );
};

export default UserProfile;
