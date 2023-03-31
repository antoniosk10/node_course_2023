import { IsEnum, IsInt, IsString } from 'class-validator';

export enum TypeUser {
  STUDENT = 'student',
  DEVELOPER = 'developer',
  MANAGER = 'manager',
  TESTER = 'tester',
  TRAINEE = 'trainee',
}

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsInt()
  age: number;

  @IsEnum(TypeUser)
  type: `${TypeUser}`;
}
