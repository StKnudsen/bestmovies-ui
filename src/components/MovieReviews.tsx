import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { IReview } from "../interfaces/IReview";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

interface IProps {
  movieId: number;
  comments: IReview[];
}

const MovieReviews = (props: IProps) => {
  const { comments } = props;
  const auth = getAuth();
  const [movieRating, setMovieRating] = useState<number | null>(0);

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <Accordion sx={{ backgroundColor: "ghostwhite" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel-comments"
      >
        <Typography variant="h4">Reviews</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {comments.map((user) => {
          return (
            <Card key={user.id} sx={{ display: "flex", my: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  width: "100%",
                }}
              >
                <Grid container sx={{ width: "100%" }}>
                  <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                    <Typography variant="h5">
                      <AccountCircle sx={{ color: "lightgray" }} /> {user.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <StyledRating
                      name="movie-rating"
                      value={user.rating}
                      getLabelText={(value: number) =>
                        `${value} Heart${value !== 1 ? "s" : ""}`
                      }
                      max={10}
                      icon={<FavoriteIcon fontSize="inherit" />}
                      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      sx={{ mt: 1 }}
                      readOnly
                    />
                  </Grid>
                </Grid>

                <Typography variant="body1" mt={1}>
                  &ldquo;{user.comment}&rdquo;
                </Typography>
              </Box>
            </Card>
          );
        })}

        {auth.currentUser?.displayName ? (
          <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
            <Typography component="legend" variant="h5">
              Add your rating and review:
            </Typography>

            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <StyledRating
                  name="movie-rating"
                  value={movieRating}
                  onChange={(event, newValue) => {
                    setMovieRating(newValue);
                  }}
                  getLabelText={(value: number) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  max={10}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Typography textAlign={"end"} mt={-1} variant="subtitle2">
                  You have selected: {movieRating} hearts
                </Typography>
              </Grid>
            </Grid>

            <TextField
              sx={{ mt: 2 }}
              id="review-input"
              label="Review"
              multiline
              rows={4}
            />
            <Button variant="contained">Add review</Button>
          </Card>
        ) : (
          <Button component={Link} to="/login">
            Log in to comment
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MovieReviews;
