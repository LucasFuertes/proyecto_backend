export class SetUser {
  constructor(user) {}
}

export class GetUser {
  constructor(user) {
    this.fullName = `${user.firstName} ${user.lastName}`;
    this.userName = user.username;
    this.role = user.role;
  }
}
