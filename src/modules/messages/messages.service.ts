import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto, GetMessagesByConversationNumberDto } from './dto';
import { MessageSocketGateway } from '../gateway/messageSocketGateway';
import { date as dateHelper } from '@helpers';

@Injectable()
export class MessagesService {
    constructor(
        private messagesRepository: MessagesRepository,
        private messageSocketGateway: MessageSocketGateway
    ) {}

    createMessage = async (messageData: CreateMessageDto, userNumber: string) => {
        this.messageSocketGateway.newUserMessage({
            userNumber,
            text: messageData.text,
            conversationNumber: messageData.conversationNumber,
            createdAt: dateHelper.nowDateWithToDate()
        });
        await this.messagesRepository.createMessage({
            userNumber,
            ...messageData
        });
    };

    getMessagesByConversationNumber = async (getMessageData: GetMessagesByConversationNumberDto) =>
        this.messagesRepository.getMessagesByConversationNumber(getMessageData.conversationNumber);
}
