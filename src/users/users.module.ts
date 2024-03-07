import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository]
})
export class UsersModule {}
