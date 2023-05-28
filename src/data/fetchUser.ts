import { QueryFunction } from "@tanstack/query-core";
import { config } from "../config";
import { IUser } from "../interfaces/IUser";

const fetchUser: QueryFunction<IUser, ["user", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`${config.BFF}user/${id}`);

  if (!apiResponse.ok) {
    throw new Error(
      `Error occored while fetching user from best movies database with the id: ${id}`
    );
  }

  return apiResponse.json();
};

export default fetchUser;
