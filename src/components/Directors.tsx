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
import InformationBox from "./InformationBox";
import { useQuery } from "@tanstack/react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { config } from "../config";

interface IProps {
  movieId: number;
}

const Directors = (props: IProps) => {
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
  const directors = credits.crew.filter((crew) => {
    return crew.job === "Director";
  });

  return (
    <Accordion sx={{ backgroundColor: "ghostwhite" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel-directors"
      >
        <Typography variant="h4">
          {directors.length > 1 ? "Directors" : "Director"}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {directors.map((director) => {
          if (director.job === "Director") {
            return (
              <Card key={director.id} sx={{ display: "flex", my: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: "6rem" }}
                  image={
                    director.profile_path
                      ? `${config.IMG_URL}${director.profile_path}`
                      : "https://placehold.co/96x144?text=No+photo"
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                  <Typography variant="h5">{director.name}</Typography>
                  <Typography variant="caption">
                    Popularity: {director.popularity.toPrecision(3)}
                  </Typography>
                  <Typography variant="subtitle1" mt={1}>
                    Know for: {director.known_for_department}
                  </Typography>
                </Box>
              </Card>
            );
          }
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default Directors;
