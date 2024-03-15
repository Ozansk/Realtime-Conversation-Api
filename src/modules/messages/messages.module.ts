import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.entity';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
    imports: [AuthModule, GatewayModule, SequelizeModule.forFeature([Message])],
    controllers: [MessagesController],
    providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}
