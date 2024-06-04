import AgenceInterim from "./AgenceInterim";
import { RoleEnum } from "./enum";

export default interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  tel?: string;
  role?: RoleEnum[];
  agence?: AgenceInterim;
  username: string;
  password?: string;
  token?: string;
}
