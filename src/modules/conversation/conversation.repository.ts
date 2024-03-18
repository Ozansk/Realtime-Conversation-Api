import { Conversation } from './conversation.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Conversation as ConversationModel } from './conversation.model';

export class ConversationRepository {
    constructor(
        @InjectModel(Conversation)
        private readonly conversationEntity: typeof Conversation
    ) {}

    createConversation = async (conversationData: ConversationModel) =>
        this.conversationEntity.create({ ...conversationData });

    closeConversation = async (conversationNumber: string) =>
        this.conversationEntity.update(
            {
                isActive: false
            },
            {
                where: {
                    conversationNumber
                }
            }
        );

    getConversationByNumber = async (conversationNumber: string) =>
        this.conversationEntity.findOne({
            where: {
                conversationNumber
            }
        });
}
