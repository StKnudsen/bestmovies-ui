import { Card, Container, Typography } from "@mui/material";
import TopListMovie from "./TopListMovie";
import { useEffect, useState } from "react";
import { config } from "../config";
import { getAuth } from "firebase/auth";
import ErrorBoundary from "../ErrorBoundary";
import InformationBox from "./InformationBox";
import { IToplist } from "../interfaces/IToplist";

const TopList = () => {
  const auth = getAuth();
  const [toplist, setToplist] = useState<IToplist>();

  useEffect(() => {
    if (!auth.currentUser?.uid) {
      throw new Error(`Error getting google user id`);
    }

    fetch(`${config.BFF}toplist/${auth.currentUser?.uid}`)
      .then((response) => response.json())
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .then((data) => setToplist(data))
      .catch((error) => console.log(error));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!toplist) {
    return <InformationBox message="No toplist ..." />;
  }

  const list = toplist.TitleIds.filter((e) => e != null);

  return (
    <Container maxWidth="lg" sx={{ pt: 8 }}>
      <Card sx={{ width: "100%", p: 2 }}>
        <Typography component="h2" variant="h5" my={2} mx={2}>
          Your movies top list
        </Typography>

        {list ? (
          list.map((element, index) => (
            <TopListMovie
              key={index}
              index={index}
              movieId={element.toString()}
            />
          ))
        ) : (
          <Typography ml={2}>
            No movies have been added to toplist yet
          </Typography>
        )}
      </Card>
    </Container>
  );
};

export default function ToplistErrorBoundary() {
  return (
    <ErrorBoundary>
      <TopList />
    </ErrorBoundary>
  );
}
