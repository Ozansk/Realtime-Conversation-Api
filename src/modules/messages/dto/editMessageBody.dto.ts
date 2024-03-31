import { IsNotEmpty, IsString } from 'class-validator';

class EditMessageBodyDto {
    @IsNotEmpty()
    @IsString()
    text: string;
}

export { EditMessageBodyDto };
