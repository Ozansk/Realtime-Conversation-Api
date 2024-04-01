import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import postgreConfig from '@config/database.config.json';
import Postgres from '../db/postgre';
import { GatewayModule } from './gateway/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongodbConfig from '@config/mongodb.config.json';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        GatewayModule,
        MessagesModule,
        ConversationModule,
        SequelizeModule.forRoot(new Postgres().setConfig(postgreConfig).setSequelizeModel().getSequelizeModel()),
        MongooseModule.forRoot(mongodbConfig.HOSTNAME + mongodbConfig.DATABASE)
    ]
})
export class AppModule {}
