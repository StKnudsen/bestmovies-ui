import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { IReview } from "../interfaces/IReview";

interface IProps {
    movieId: number;
    comments: IReview[];
}

const MovieComments = ( props: IProps ) => {
    const { comments } = props
    const auth = getAuth();

    return (
        <Accordion  sx={{ backgroundColor: 'ghostwhite' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel-comments"
        >
          <Typography variant="h4">
             Reviews
           </Typography>
        </AccordionSummary>
        <AccordionDetails>
           {comments.map((user) => {
               return (
                 <Card key={user.id} sx={{ display: "flex", my: 2 }}>
                   <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
                     <Typography variant="h5">
                        <AccountCircle sx={{ color: 'lightgray'}} />  {user.name}
                    </Typography>
                     <Typography variant="body1" mt={1}>
                        &ldquo;{user.comment}&rdquo;
                     </Typography>
                   </Box>
                 </Card>
                )}
           )}

            { auth.currentUser?.displayName 
                ? (
                  <Card sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                    <TextField
                      id="review-input"
                      label="Review"
                      multiline
                      rows={4}
                    />
                    <Button variant="contained">Add comment as: {auth.currentUser?.displayName}</Button>
                </Card>
                ) 
                : (<Button component={Link} to="/login">Log in to comment</Button>)
            }
        </AccordionDetails>
      </Accordion>  
    );
}

export default MovieComments;