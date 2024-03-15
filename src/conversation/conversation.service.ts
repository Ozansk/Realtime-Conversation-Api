import { Injectable } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { common as commonHelper } from '@helpers';

@Injectable()
export class ConversationService {
    constructor(private conversationRepository: ConversationRepository) {}

    createConversation = async (userNumber: string) =>
        this.conversationRepository.createConversation({
            owner: userNumber,
            conversationNumber: 'CON-' + `${commonHelper.generateRandomText()}`,
            isActive: true
        });

    closeConversation = async (conversationNumber: string) =>
        this.conversationRepository.closeConversation(conversationNumber);
}
