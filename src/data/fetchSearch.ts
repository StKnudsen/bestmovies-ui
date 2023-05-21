import { QueryFunction } from "@tanstack/react-query";
import { IMovieList } from "../interfaces/IMovieList";
import { config } from "../config";

const fetchSearch: QueryFunction<
  IMovieList,
  ["search", { title: string }]
> = async ({ queryKey }) => {
  const { title } = queryKey[1];
  let url = `${config.BFF}popular`;

  if (title.length) {
    url = `${config.BFF}search/${title}`;
  }

  const apiResponse = await fetch(url);

  if (!apiResponse.ok) {
    throw new Error(`API error in the search for '${title}'.`);
  }

  return apiResponse.json();
};

export default fetchSearch;
