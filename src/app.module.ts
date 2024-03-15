import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import postgreConfig from '@config/database.config.json';
import Postgres from './db/postgre';
import { GatewayModule } from './gateway/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        GatewayModule,
        MessagesModule,
        SequelizeModule.forRoot(new Postgres().setConfig(postgreConfig).setSequelizeModel().getSequelizeModel()),
        ConversationModule
    ]
})
export class AppModule {}
