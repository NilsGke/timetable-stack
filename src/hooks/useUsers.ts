import { useState } from "react";
import type { UserType } from "../types";
import { getUnusedColor } from "@/helpers/colors";

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const updateUser = (newUser: UserType) => {
    const index = users.findIndex(({ id }) => id === newUser.id);
    if (index === -1) throw Error("could not find user with id: " + newUser.id);
    const newUsers = users.slice();
    newUsers[index] = newUser;
    setUsers(newUsers);
  };
  const addUser = () =>
    setUsers([
      ...users,
      {
        name: "",
        color: getUnusedColor(users.map((user) => user.color)),
        events: [],
        id: crypto.randomUUID(),
      },
    ]);

  const removeUser = (id: UserType["id"]) =>
    setUsers(users.filter((user) => user.id !== id));

  return { users, updateUser, addUser, removeUser };
};
