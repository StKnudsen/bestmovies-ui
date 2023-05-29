import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./styles/theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import NavigationBar from "./components/NavigationBar";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AuthRoute from "./components/AuthRoute";
import { initializeApp } from "firebase/app";
import { config } from "./config";
import { Box } from "@mui/material";
import Footer from "./components/Footer";

initializeApp(config.firebase);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ dispplay: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <NavigationBar />
            <Routes>
              <Route
                path="/profile"
                element={
                  <AuthRoute>
                    <UserProfile />
                  </AuthRoute>
                }
              />

              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Search />} />
            </Routes>
            <Footer />
          </QueryClientProvider>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render the app to");
}

const root = createRoot(container);

root.render(<App />);
