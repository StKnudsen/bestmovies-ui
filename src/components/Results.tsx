import { Container, Grid } from "@mui/material";
import { IMovie } from "../interfaces/IMovie";
import Movie from "./Movie";
import InformationBox from "./InformationBox";

const Results = ({ movies }: { movies: IMovie[] }) => {
  return (
    <Container sx={{ py: 4 }} maxWidth={"xl"}>
      {!movies.length ? (
        <InformationBox message="No movies found." />
      ) : (
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Movie
              id={movie.id}
              title={movie.title}
              genre_ids={movie.genre_ids}
              vote_average={movie.vote_average}
              poster_path={movie.poster_path}
              overview={movie.overview}
              key={movie.id}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Results;
