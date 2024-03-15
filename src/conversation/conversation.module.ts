import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { ConversationRepository } from './conversation.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Conversation } from './conversation.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule, SequelizeModule.forFeature([Conversation])],
    controllers: [ConversationController],
    providers: [ConversationService, ConversationRepository]
})
export class ConversationModule {}
