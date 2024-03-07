import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
    }
}
