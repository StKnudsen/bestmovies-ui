import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import fetchMovie from "../data/fetchMovie";
import InformationBox from "./InformationBox";
import { config } from "../config";
import {
  Box,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ErrorBoundary from "../ErrorBoundary";
import Directors from "./Directors";
import Actors from "./Actors";

const MovieDetails = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Error in parsing the movie id");
  }

  const result = useQuery(["movie", id], fetchMovie);

  if (result.isError) {
    return (
      <InformationBox message="Oh no! Something went wrong in getting movie details" />
    );
  }

  if (result.isLoading) {
    return <InformationBox message="Fetching movie details ..." />;
  }

  const movie = result?.data;

  document.title = `${movie.title}`;

  if (!movie) {
    throw new Error(`Error fetching details for the movie with id: ${id}`);
  }

  let backdrop = "https://placehold.co/500x750?text=Missing+Backdrop";
  if (movie.backdrop_path) {
    backdrop = `${config.IMG_URL}${movie.backdrop_path}`;
  }

  let poster = "https://placehold.co/500x750?text=Missing+Poster";
  if (movie.poster_path) {
    poster = `${config.IMG_URL}${movie.poster_path}`;
  }

  let imdbUrl = "https://www.imdb.com";
  if (movie.imdb_id) {
    imdbUrl = `https://www.imdb.com/title/${movie.imdb_id}`;
  }

  return (
    <Box sx={{ backgroundImage: `url(${backdrop})`, backgroundSize: "cover" }}>
      <Container
        sx={{ backgroundColor: "rgb(248, 248, 255, .8)", paddingTop: "1em" }}
      >
        <Typography variant="h2" my={8} align="center">
          {movie.title}
        </Typography>

        <Grid container spacing={2} mt={10}>
          <Grid item xs={12} sm={6} lg={4}>
            <CardMedia
              component="img"
              image={poster}
              alt={`Poster for the movie ${movie.title}`}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={8}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">
                TMBD rating: {movie.vote_average.toFixed(1)}/10
              </Typography>
              <Typography variant="caption">
                &nbsp; (number of votes: {movie.vote_count})
              </Typography>
            </Box>

            <Box mt={1}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>

            <Typography variant="body1" mt={2}>
              Runtime: {movie.runtime} minutes
            </Typography>

            <Typography variant="subtitle1">
              Original title: {movie.original_title}
            </Typography>

            <Typography variant="body1" mt={2}>
              {movie.overview}
            </Typography>

            <Typography mt={4}>
              <a href={imdbUrl}>IMDB</a>
            </Typography>
          </Grid>
        </Grid>

        <Directors movieId={movie.id} />

        <Actors movieId={movie.id} />
      </Container>
    </Box>
  );
};

export default function MovieDetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <MovieDetails />
    </ErrorBoundary>
  );
}
