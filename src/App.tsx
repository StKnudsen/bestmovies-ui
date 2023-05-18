import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import theme from "./styles/theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";

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
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/" element={<Search />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render the app to");
}

const root = createRoot(container);
root.render(<App />);
