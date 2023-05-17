import { IMovie } from "./IMovie";

export interface IMovieList {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
