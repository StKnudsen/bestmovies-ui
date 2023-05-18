import { useEffect, useState } from "react";
import { Settings } from "../settings";
import useGenreList from "../hooks/useGenreList";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string | null;
  overview: string;
}

const Movie = (props: IProps) => {
  const [genreList] = useGenreList();
  const [genres, setGenres] = useState<string[]>([]);

  let poster = "https://placehold.co/500x750?text=Missing+Poster";

  if (props.poster_path) {
    poster = `${Settings.IMG_URL}${props.poster_path}`;
  }

  useEffect(() => {
    const movieGenres: string[] = [];

    props.genre_ids.forEach((genreId) => {
      genreList.map((genre) => {
        if (genre.id === genreId) {
          movieGenres.push(genre.name);
        }
      });
    });

    setGenres(movieGenres);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid item key={props.id} xs={12} sm={6} md={4} xl={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Link to={`/movie/${props.id}`}>
          <CardMedia
            component="img"
            image={poster}
            alt={`Poster for the movie ${props.title}`}
          />
        </Link>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            maxHeight={30}
            overflow={"hidden"}
          >
            {props.title}
          </Typography>
          <hr />

          <Box overflow={"hidden"} maxHeight={24}>
            {genres.map((genre) => (
              <Chip key={genre} label={genre} size="small" variant="outlined" />
            ))}
          </Box>

          <Typography marginTop={1} maxHeight={48} overflow={"hidden"}>
            {props.overview}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>Rating: {props.vote_average}</Typography>
          <Button
            size="small"
            variant="outlined"
            component={Link}
            to={`/movie/${props.id}`}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Movie;
