import { useQuery } from "@tanstack/react-query";
import InformationBox from "./InformationBox";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import fetchCredits from "../data/fetchCredits";
import { config } from "../config";

interface IProps {
  movieId: number;
}

const Actors = (props: IProps) => {
  if (!props.movieId) {
    throw new Error("Error in parsing the movie id");
  }

  const result = useQuery(["credits", props.movieId], fetchCredits);

  if (result.isError) {
    return (
      <InformationBox message="Oh no! Something went wrong in getting movie credits" />
    );
  }

  if (result.isLoading) {
    return <InformationBox message="Fetching movie details ..." />;
  }

  const credits = result?.data;
  const actors = credits.cast.slice(0, 12);

  return (
    <Grid container spacing={2} mt={4}>
      <Grid item xs={12} sm={4} lg={6} textAlign={"center"}>
        <Typography variant="h4" mt={1}>
          Cast
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} lg={6}>
        {actors.map((actor) => {
          {
            return (
              <Card key={actor.id} sx={{ display: "flex", my: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: "6rem", maxHeight: "8rem" }}
                  image={
                    actor.profile_path
                      ? `${config.IMG_URL}${actor.profile_path}`
                      : "https://placehold.co/96x144?text=No+photo"
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                  <Typography variant="h5">{actor.name}</Typography>
                  <Typography variant="caption">
                    Popularity: {actor.popularity.toPrecision(3)}
                  </Typography>
                  <Typography variant="subtitle1" mt={1}>
                    {actor.character}
                  </Typography>
                </Box>
              </Card>
            );
          }
        })}
      </Grid>
    </Grid>
  );
};

export default Actors;
