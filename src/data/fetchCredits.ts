import { QueryFunction } from "@tanstack/react-query";
import { ICredits } from "../interfaces/ICredits";
import { config } from "../config";

const fetchCredits: QueryFunction<ICredits, ["credits", number]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`${config.BFF}credits/${id}`);

  if (!apiResponse.ok) {
    throw new Error(
      `Error occored while fetching credits for movie with id: ${id}`
    );
  }

  return apiResponse.json();
};

export default fetchCredits;
