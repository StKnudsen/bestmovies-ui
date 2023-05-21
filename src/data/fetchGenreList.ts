import { QueryFunction } from "@tanstack/react-query";
import { IGenreList } from "../interfaces/IGenreList";
import { config } from "../config";

const fetchGenreList: QueryFunction<IGenreList, ["genres"]> = async () => {
  const apiResponse = await fetch(`${config.BFF}genre`);

  if (!apiResponse.ok) {
    throw new Error("Genres failed loading from the API.");
  }

  return apiResponse.json();
};

export default fetchGenreList;
