export enum TypeUser {
  STUDENT = "student",
  DEVELOPER = "developer",
  MANAGER = "manager",
  TESTER = "tester",
  TRAINEE = "trainee",
}

export interface User {
  id: number;
  fullName: string;
  age: number;
  type: `${TypeUser}`;
}
