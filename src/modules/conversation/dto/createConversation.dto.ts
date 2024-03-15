import { IsArray, IsString, ArrayMinSize } from 'class-validator';

class CreateConversationDto {
    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(1)
    participants: string[];
}

export { CreateConversationDto };
