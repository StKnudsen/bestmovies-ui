import { Card, Container, Typography } from "@mui/material";
import TopListMovie from "./TopListMovie";

const TopList = () => {

    const toplist = [502356, 447365, 76600, 603692, 220845];

    return (
        <Container maxWidth="lg" sx={{ pt: 8 }}>
            <Card sx={{ width: '100%', p: 2 }}>
                <Typography component="h2" variant="h5" my={2} mx={2}>
                    Your movies top list
                </Typography>
                
                {
                    toplist.map((element, index) => (
                        <TopListMovie key={index} index={index} movieId={element.toString()} />
                    ))
                }
                <Card >

                </Card>
            </Card>
        </Container>
    )
}

export default TopList;