import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
//import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
