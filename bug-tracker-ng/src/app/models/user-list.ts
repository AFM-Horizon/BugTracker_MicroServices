import { User } from "./user";

export class UserStatus {
  user: User
  isAdded: boolean

  constructor(isAdded: boolean, user: User) {
    this.isAdded = isAdded;
    this.user = user;
  }
}