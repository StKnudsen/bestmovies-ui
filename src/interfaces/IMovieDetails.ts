import { IGenre } from "./IGenre";
import { IProductionCompany } from "./IProductionCompany";
import { IProductionCountry } from "./IProductionCountry";
import { ISpokenLanguage } from "./ISpokenLanguage";
import { Status } from "./Status";

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: object | null;
  budget: number;
  genres: IGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: IProductionCompany[];
  production_countries: IProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: ISpokenLanguage[];
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
