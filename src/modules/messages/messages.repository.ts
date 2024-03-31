import { Message } from './message.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Message as MessageModel } from './message.model';

export class MessagesRepository {
    constructor(
        @InjectModel(Message)
        private readonly messagesEntity: typeof Message
    ) {}

    createMessage = async (messageData: MessageModel) => this.messagesEntity.create({ ...messageData });

    getMessagesByConversationNumber = async (conversationNumber: string) =>
        this.messagesEntity.findAll({
            where: {
                conversationNumber
            },
            order: [['createdAt', 'DESC']]
        });

    findMessageById = async (id: number) =>
        this.messagesEntity.findOne({
            where: {
                id
            }
        });

    editMessageById = async (id: number, text: string) =>
        this.messagesEntity.update(
            {
                text
            },
            {
                where: {
                    id
                },
                returning: true
            }
        );
}
