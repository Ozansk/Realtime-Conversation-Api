import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto, GetMessagesByConversationNumberDto } from './dto';

@Injectable()
export class MessagesService {
    constructor(private messagesRepository: MessagesRepository) {}

    createMessage = async (messageData: CreateMessageDto, userNumber: string) =>
        this.messagesRepository.createMessage({
            userNumber,
            ...messageData
        });

    getMessagesByConversationNumber = async (getMessageData: GetMessagesByConversationNumberDto) =>
        this.messagesRepository.getMessagesByConversationNumber(getMessageData.conversationNumber);
}
