import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt = require('bcrypt');

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(body) {
    const user = new User();
    user.name = body.name;
    user.email = body.email;
    user.password = await bcrypt.hash(body.password, 10);

    const emailExists = await this.usersRepository.findOne({
      email: body.email,
    });

    if (emailExists) {
      throw new BadRequestException('Email already in use');
    }

    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  async update(id, body) {
    const user = await this.usersRepository.findOne(id);
    user.name = body.name || user.name;

    if (body.email && body.email !== user.email) {
      const emailExists = await this.usersRepository.findOne({
        email: body.email,
      });

      if (emailExists) {
        throw new BadRequestException('Email already in use');
      }

      user.email = body.email;
    }

    user.password = body.password
      ? await bcrypt.hash(body.password, 10)
      : user.password;

    const newUser = await this.usersRepository.save(user);
    delete newUser.password;
    return newUser;
  }
}
