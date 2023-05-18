import { QueryFunction } from "@tanstack/react-query";
import { ICredits } from "../interfaces/ICredits";
import { Settings } from "../settings";

const fetchCredits: QueryFunction<ICredits, ["credits", number]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`${Settings.BFF}credits/${id}`);

  if (!apiResponse.ok) {
    throw new Error(
      `Error occored while fetching credits for movie with id: ${id}`
    );
  }

  return apiResponse.json();
};

export default fetchCredits;
