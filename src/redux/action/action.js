import { add_user, delete_user, edit_user, update_user } from "../type/type";

export const deleteUser = (username) => ({
  type: delete_user,
  username,
});
export const editUser = (user) => ({
  type: edit_user,
  user,
});
export const addUser = (user, error) => ({
  type: add_user,
  user,
  error,
});
export const updateUser = (user) => ({
  type: update_user,
  user,
});
