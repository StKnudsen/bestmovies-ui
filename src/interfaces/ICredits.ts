import { IActor } from "./IActor";
import { ICrew } from "./ICrew";

export interface ICredits {
  id: number;
  cast: IActor[];
  crew: ICrew[];
}
