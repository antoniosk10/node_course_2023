import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    return this.usersRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new BadRequestException();

    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
