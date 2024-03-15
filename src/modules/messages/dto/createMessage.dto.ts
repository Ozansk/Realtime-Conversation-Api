import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    conversationNumber: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    text: string;
}

export { CreateMessageDto };
