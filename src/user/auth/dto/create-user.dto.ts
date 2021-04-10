import {IsEmail, IsString, MinLength, MaxLength, Matches, IsPhoneNumber, IsOptional, Length} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        minimum: 4,
        maximum: 20,
    })
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        minimum: 4,
        maximum: 20,
    })
    firstName: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        minimum: 4,
        maximum: 20,
    })
    lastName: string;

    @IsEmail()
    @ApiProperty({
        example: 'email@example.com'
    })
    email: string;

    @IsPhoneNumber("FR")
    @IsOptional()
    @ApiPropertyOptional()
    phoneNumber?: string;

    @IsOptional()
    @ApiPropertyOptional()
    isOnline: boolean;


    @ApiPropertyOptional()
    image?: string;

    @IsString()
    @MinLength(8)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Mot de passe trop faible'}
    )
    @ApiProperty({
        minimum: 8,
        pattern: "/(?:(?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$/"
    })
    password: string;
}
