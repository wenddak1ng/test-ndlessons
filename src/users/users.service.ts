import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InsertResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const insertResult = await this.insertUser(createUserDto);
    const result = Object.assign(createUserDto, insertResult.raw[0].id);

    return result;
  }

  public async findAll() {
    return await this.usersRepository.find();
  }

  public async findOne(id: number) {
    return await this.usersRepository.findOneBy({
      id: id,
    });
  }

  private async insertUser(
    createUserDto: CreateUserDto,
  ): Promise<InsertResult> {
    return await this.usersRepository.insert(createUserDto);
  }
}
