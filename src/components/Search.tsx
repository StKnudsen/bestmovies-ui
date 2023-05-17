import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "../ErrorBoundary";
import { useState } from "react";
import fetchSearch from "../data/fetchSearch";
import { Container, Divider, InputBase, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Results from "./Results";

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
  });
  const results = useQuery(["search", searchParams], fetchSearch);
  const moviesList = results?.data?.results ?? [];

  return (
    <>
      <Container sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={12}
          component="form"
          sx={{
            p: "8px 16px",
            display: "flex",
            alignItems: "center",
            width: 440,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const obj = {
              title: formData.get("title")?.toString() ?? "",
            };
            setSearchParams(obj);
          }}
        >
          <InputBase
            id="title"
            name="title"
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for .."
            inputProps={{ "aria-label": "search for a movie" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <Divider sx={{ height: 36, m: 0.5 }} orientation="vertical" />
          <IconButton sx={{ p: "10px" }} aria-label="directions">
            <ClearIcon />
          </IconButton>
        </Paper>
      </Container>

      <Results movies={moviesList} />
    </>
  );
};

export default function SearchErrorBoundary() {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
}
