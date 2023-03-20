import { TypeUser } from "./user.interface";

export type RequestParams = {
  fullnameSearch?: string;
  minAge?: number;
  maxAge?: number;
  type?: `${TypeUser}`;
  limit?: number;
};
