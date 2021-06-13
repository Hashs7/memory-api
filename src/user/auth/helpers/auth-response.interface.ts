import { User } from '../../user.schema';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
