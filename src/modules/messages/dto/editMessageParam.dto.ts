import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class EditMessageParamDto {
    @IsNotEmpty()
    @Type(() => Number)
    id: number;
}

export { EditMessageParamDto };
