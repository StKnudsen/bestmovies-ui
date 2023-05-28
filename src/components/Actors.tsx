import { useQuery } from "@tanstack/react-query";
import InformationBox from "./InformationBox";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import fetchCredits from "../data/fetchCredits";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
    <Accordion sx={{ backgroundColor: "ghostwhite" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel-actors"
      >
        <Typography variant="h4">Cast</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {actors.map((actor) => {
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
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default Actors;
