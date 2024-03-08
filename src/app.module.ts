import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import postgreConfig from '@config/database.config.json';
import Postgres from './db/postgre';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        SequelizeModule.forRoot(new Postgres().setConfig(postgreConfig).setSequelizeModel().getSequelizeModel())
    ]
})
export class AppModule {}
