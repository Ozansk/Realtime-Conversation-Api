import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository]
})
export class UsersModule {}
