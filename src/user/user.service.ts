import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.entity';
import { QueryParams } from './types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: QueryParams): Promise<User[]> {
    const { fullnameSearch, minAge, maxAge, type, limit } = query;
    const result = this.usersRepository.createQueryBuilder('user');

    if (fullnameSearch) {
      result.andWhere('user.fullName = :fullnameSearch', { fullnameSearch });
    }

    if (minAge) {
      result.andWhere('user.age >= :minAge', { minAge });
    }

    if (maxAge) {
      result.andWhere('user.age <= :maxAge', { maxAge });
    }

    if (type) {
      result.andWhere('user.type = :type', { type });
    }

    return result.take(limit).getMany();
  }

  async add(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.fullName = createUserDto.fullName;
    user.age = createUserDto.age;
    user.type = createUserDto.type;

    return this.usersRepository.save(user);
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new BadRequestException();
    user.fullName = createUserDto.fullName;
    user.age = createUserDto.age;
    user.type = createUserDto.type;

    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
