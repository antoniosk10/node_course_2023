import { TypeUser } from './dto/create-user.dto';

export type QueryParams = {
  fullnameSearch?: string;
  minAge?: number;
  maxAge?: number;
  type?: `${TypeUser}`;
  limit?: number;
};
