import { IsNotEmpty, IsString } from 'class-validator';

class CloseConversationDto {
    @IsNotEmpty()
    @IsString()
    conversationNumber: string;
}

export { CloseConversationDto };
