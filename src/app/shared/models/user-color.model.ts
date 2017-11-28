import { User } from './user.model';

export class UserColor {
  userId: User;
  color: {
      h: number,
      l: number,
      s: number
  };
}
