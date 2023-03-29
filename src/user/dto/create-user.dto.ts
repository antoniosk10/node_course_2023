export enum TypeUser {
  STUDENT = 'student',
  DEVELOPER = 'developer',
  MANAGER = 'manager',
  TESTER = 'tester',
  TRAINEE = 'trainee',
}

export class CreateUserDto {
  fullName: string;
  age: number;
  type: `${TypeUser}`;
}
