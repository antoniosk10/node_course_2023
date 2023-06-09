import { RequestParams } from "./user/types";
import { User } from "./user/user.interface";

export const getUsersByParams = (
  { fullnameSearch, minAge, maxAge, type, limit }: RequestParams,
  users: User[]
) => {
  return users
    .filter((user) => {
      if (fullnameSearch && fullnameSearch !== user.fullName) return false;
      if (minAge && minAge > user.age) return false;
      if (maxAge && maxAge < user.age) return false;
      return !(type && type !== user.type);
    })
    .slice(0, limit);
};
