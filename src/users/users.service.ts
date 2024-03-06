import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private usersRepository: typeof User
    ) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.findAll();
    }
}
