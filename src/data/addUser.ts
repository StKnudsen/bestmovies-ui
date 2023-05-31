import { config } from "../config";
import { getAuth } from "firebase/auth";

const addUser = async () => {
  const auth = getAuth();

  if (!auth.currentUser?.uid) {
    throw new Error(`Error getting google user id`);
  }

  if (!auth.currentUser?.displayName) {
    throw new Error(`Error getting google username`);
  }

  const apiResponse = await fetch(
    `${config.BFF}user/${auth.currentUser?.uid}/${auth.currentUser?.displayName}`,
    { method: "PUT" }
  );

  if (!apiResponse.ok) {
    throw new Error(`Error occored while adding user`);
  }

  return apiResponse.json();
};

export default addUser;
