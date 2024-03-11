import { IsNotEmpty, IsString, Length } from 'class-validator';

class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(10, 10)
    phoneNumber: string;
}

export { CreateUserDto };
