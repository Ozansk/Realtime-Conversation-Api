import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // todo ozan need this route?
    @UseGuards(AuthGuard)
    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    // todo ozan should a guard put here?
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        await this.usersService.createUser(createUserDto);
    }
}
