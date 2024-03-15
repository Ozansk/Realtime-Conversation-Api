import { IsNotEmpty, IsString } from 'class-validator';

class GetMessagesByConversationNumberDto {
    @IsNotEmpty()
    @IsString()
    conversationNumber: string;
}

export { GetMessagesByConversationNumberDto };
