import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { CreateMessageDto, GetMessagesByConversationNumberDto } from './dto';
import { MessageSocketGateway } from '../gateway/messageSocketGateway';
import { date as dateHelper } from '@helpers';
import { EditedMessageHistory } from '../../db/mongo/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
    constructor(
        private messagesRepository: MessagesRepository,
        private messageSocketGateway: MessageSocketGateway,
        @InjectModel('EditedMessageHistory') private editedMesssageHistoryModel: Model<EditedMessageHistory>
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

    editMessageById = async ({ id, text, userNumber }: { id: number; text: string; userNumber: string }) => {
        const messageData = await this.messagesRepository.findMessageById(id);
        await this.messagesRepository.editMessageById(id, text);
        const historyData = new this.editedMesssageHistoryModel({
            messageId: id,
            userNumber,
            oldText: messageData.text,
            newText: text
        });
        await historyData.save();
    };
}
