import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import fetchMovie from "../data/fetchMovie";
import InformationBox from "../components/InformationBox";
import { config } from "../config";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ErrorBoundary from "../ErrorBoundary";
import Directors from "../components/Directors";
import Actors from "../components/Actors";
import MovieReviews from "../components/MovieReviews";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { IReview } from "../interfaces/IReview";

const MovieDetails = () => {
  const { id } = useParams();
  const auth = getAuth();
  const navigate = useNavigate();

  // DUMMY DATA FOR Rating and Reviews
  const comments: IReview[] = [
    {
      id: "1234",
      name: "Jane",
      rating: 7,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptates quidem nobis exercitationem quaerat at accusantium eos neque veniam harum. Ratione non officiis, culpa iusto expedita dolores reprehenderit fugit illo.",
    },
    {
      id: "4567",
      name: "John",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure a odio fugit, sunt recusandae sint quibusdam corrupti ex, rerum magnam similique laudantium quo, consectetur amet nemo voluptatum inventore. Quod!",
    },
  ];

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

  const addToToplist = async () => {
    if (!auth.currentUser?.uid) {
      throw new Error(`Error getting google user id`);
    }

    const apiResponse = await fetch(
      `${config.BFF}toplist/${auth.currentUser?.uid}/${id}`,
      { method: "PUT" }
    );

    if (!apiResponse.ok) {
      throw new Error(`Error occored while fetching user data`);
    }

    navigate("/profile");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backdrop})`,
        backgroundSize: "cover",
        pb: 8,
      }}
    >
      <Container sx={{ backgroundColor: "rgb(248, 248, 255, .8)", pt: 4 }}>
        <Divider />
        <Typography variant="h2" my={2} align="center">
          {movie.title}
        </Typography>
        <Divider />

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6} lg={4}>
            <CardMedia
              component="img"
              image={poster}
              alt={`Poster for the movie ${movie.title}`}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            lg={8}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box flex={1}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1">
                  TMBb rating: {movie.vote_average.toFixed(1)}/10
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

              <Button
                component={Link}
                to={imdbUrl}
                variant="contained"
                sx={{ mt: 4 }}
                size="small"
              >
                IMDb
              </Button>
            </Box>

            <Box mt={2}>
              {auth.currentUser ? (
                <Button
                  variant="outlined"
                  onClick={addToToplist} // eslint-disable-line @typescript-eslint/no-misused-promises
                >
                  Add to Top list
                </Button>
              ) : (
                <Button component={Link} to="/login" variant="outlined">
                  Top list? Log in to add
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ py: 4 }}>
          <Directors movieId={movie.id} />
          <Actors movieId={movie.id} />
          <MovieReviews movieId={movie.id} comments={comments} />
        </Box>
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
