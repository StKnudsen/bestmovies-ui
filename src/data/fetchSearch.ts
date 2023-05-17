import { QueryFunction } from "@tanstack/react-query";
import { IMovieList } from "../interfaces/IMovieList";
import { Settings } from "../settings";

const fetchSearch: QueryFunction<
  IMovieList,
  ["search", { title: string }]
> = async ({ queryKey }) => {
  const { title } = queryKey[1];
  let url = `${Settings.BFF}popular`;

  if (title.length) {
    title.replace(/\s/g, "");
    url = `${Settings.BFF}search/${title}`;
  }

  const apiResponse = await fetch(url);

  if (!apiResponse.ok) {
    throw new Error(`API error in the search for '${title}'.`);
  }

  return apiResponse.json();
};

export default fetchSearch;
