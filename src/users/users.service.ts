import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto';
import { common as commonHelper } from '@helpers';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.getAllUsers();
    }

    createUser = async (userData: CreateUserDto) => {
        return this.usersRepository.createUser({
            userNumber: 'USR-' + `${commonHelper.generateRandomText()}`,
            isActive: true,
            ...userData
        });
    };
}
