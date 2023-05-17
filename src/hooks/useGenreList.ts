import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchGenreList from "../data/fetchGenreList";
import { IGenre } from "../interfaces/IGenre";

export default function useGenreList() {
  const results = useQuery(["genres"], fetchGenreList);

  return [results?.data?.genres ?? [], results.status] as [
    IGenre[],
    QueryStatus
  ];
}
