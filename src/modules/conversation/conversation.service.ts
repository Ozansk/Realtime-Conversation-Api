import { Injectable, Inject } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { common as commonHelper } from '@helpers';
import { CreateConversationDto } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ConversationService {
    constructor(
        private conversationRepository: ConversationRepository,
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    createConversation = async (createConversationDto: CreateConversationDto, userNumber: string) => {
        const conversationData = await this.conversationRepository.createConversation({
            owner: userNumber,
            conversationNumber: 'CON-' + `${commonHelper.generateRandomText()}`,
            isActive: true
        });
        this.cacheManager.set(
            `conversation:${conversationData.conversationNumber}:participants`,
            createConversationDto.participants
        );
        return conversationData;
    };

    closeConversation = async (conversationNumber: string) =>
        this.conversationRepository.closeConversation(conversationNumber);
}
