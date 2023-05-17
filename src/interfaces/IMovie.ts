export interface IMovie {
  id: number;
  title: string;
  genre_ids: number[];
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  original_language: string;
  original_title: string;
  popularity: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}
