import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import postgreConfig from './config/database.config.json';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [UsersModule, SequelizeModule.forRoot({
    host: postgreConfig.HOSTNAME,
    username: postgreConfig.USERNAME,
    password: postgreConfig.PASSWORD,
    database: postgreConfig.SCHEMA,
    dialect: 'postgres',
    pool: {
        max: postgreConfig.OPTIONS.MAX_CONNECTION,
        min: postgreConfig.OPTIONS.MIN_CONNECTION,
        idle: postgreConfig.OPTIONS.IDLE_TIME
    },
    logging: postgreConfig.OPTIONS.LOGGING || false,
    benchmark: postgreConfig.OPTIONS.BENCHMARK || false,
    models: [__dirname + `/../**/*.entity.{js,ts}`],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.entity')).toLowerCase() === member.toLowerCase();
    },
    repositoryMode: true,
    dialectOptions: {
        decimalNumbers: true
    },
    timezone: 'Europe/Istanbul'
  })],
})
export class AppModule {}
