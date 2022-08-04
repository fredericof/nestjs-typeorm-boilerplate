import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUser(id: number): Promise<User | null> {
    return this.repository.findOneBy({
      id,
    });
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = plainToClass(User, body);
    return this.repository.save(user);
  }
}
