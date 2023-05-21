import { QueryFunction } from "@tanstack/react-query";
import { IMovieDetails } from "../interfaces/IMovieDetails";
import { config } from "../config";

const fetchMovie: QueryFunction<IMovieDetails, ["movie", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`${config.BFF}movie/${id}`);

  if (!apiResponse.ok) {
    throw new Error(
      `Error occored while fetching details for movie with id: ${id}`
    );
  }

  return apiResponse.json();
};

export default fetchMovie;
