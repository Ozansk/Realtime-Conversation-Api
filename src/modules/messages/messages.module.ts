import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.entity';
import { GatewayModule } from '../gateway/gateway.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EditedMessageHistorySchema } from '../../db/mongo/schemas';

@Module({
    imports: [
        AuthModule,
        GatewayModule,
        SequelizeModule.forFeature([Message]),
        MongooseModule.forFeature([{ name: 'EditedMessageHistory', schema: EditedMessageHistorySchema }])
    ],
    controllers: [MessagesController],
    providers: [MessagesService, MessagesRepository]
})
export class MessagesModule {}
