import { QueryFunction } from "@tanstack/react-query";
import { IGenreList } from "../interfaces/IGenreList";
import { Settings } from "../settings";

const fetchGenreList: QueryFunction<IGenreList, ["genres"]> = async () => {
  const apiResponse = await fetch(`${Settings.BFF}genre`);

  if (!apiResponse.ok) {
    throw new Error("Genres failed loading from the API.");
  }

  return apiResponse.json();
};

export default fetchGenreList;
