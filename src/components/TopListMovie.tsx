import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchMovie from "../data/fetchMovie";
import InformationBox from "./InformationBox";
import { config } from "../config";
import { Link } from "react-router-dom";

interface IProps {
  movieId: string;
  index: number;
}

const TopListMovie = (props: IProps) => {
  const { movieId } = props;

  const result = useQuery(["movie", movieId], fetchMovie);

  if (result.isError) {
    return (
      <InformationBox message="Oh no! Something went wrong in getting movie details" />
    );
  }

  if (result.isLoading) {
    return <InformationBox message="Fetching movie details ..." />;
  }

  const movie = result?.data;

  if (!movie) {
    throw new Error(`Error fetching details for the movie with id: ${movieId}`);
  }

  let backdrop = "https://placehold.co/500x750?text=Missing+Backdrop";
  if (movie.backdrop_path) {
    backdrop = `${config.IMG_URL}${movie.backdrop_path}`;
  }

  let poster = "https://placehold.co/500x750?text=Missing+Poster";
  if (movie.poster_path) {
    poster = `${config.IMG_URL}${movie.poster_path}`;
  }

  return (
    <Card
      key={movieId}
      sx={{
        backgroundImage: `url(${backdrop})`,
        backgroundSize: "cover",
        mt: 2,
      }}
    >
      <Box sx={{ backgroundColor: "rgb(248, 248, 255, .8)", display: "flex" }}>
        <Typography variant="h3" px={3} alignSelf={"center"}>
          {props.index + 1}
        </Typography>
        <CardMedia
          component="img"
          image={poster}
          alt={`Poster for the movie ${movie.title}`}
          sx={{ maxWidth: "8rem" }}
        />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant="h5" p={2}>
            {movie.title}
          </Typography>
          <Typography variant="body1" px={2}>
            {movie.overview}
          </Typography>
          <Button
            variant="contained"
            sx={{ m: 2 }}
            component={Link}
            to={`/movie/${movie.id}`}
          >
            Go to details
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default TopListMovie;
