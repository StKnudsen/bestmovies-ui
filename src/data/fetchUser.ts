import { QueryFunction } from "@tanstack/query-core";
import { config } from "../config";
import { IUser } from "../interfaces/IUser";
import { getAuth } from "firebase/auth";

const fetchUser: QueryFunction<IUser, ["user", string]> = async ({
  queryKey,
}) => {
  const id = queryKey[1];

  const apiResponse = await fetch(`${config.BFF}user/${id}`);

  if (!apiResponse.ok) {
    // const auth = getAuth();
    // const name = auth.currentUser?.displayName ? auth.currentUser?.displayName : 'Doe';
    // const id = auth.currentUser?.uid ? auth.currentUser?.uid : 'error';

    // const putResponse = await fetch(
    //     `${config.BMDB}user?username=${name}&${id}`,
    //     {
    //         method: "PUT",
    //         mode: 'no-cors',
    //     },
    // );

    // if (putResponse.ok) {

    //     //
    //     console.log(putResponse);
    //     //

    //     return putResponse.json();
    // }

    throw new Error(
      `Error occored while fetching user from best movies database with the id: ${id}`
    );
  }

  //
  console.log(apiResponse);
  //

  return apiResponse.json();
};

export default fetchUser;
