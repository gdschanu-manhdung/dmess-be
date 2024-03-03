import {
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsStrongPassword,
    MaxLength,
    IsDateString,
} from 'class-validator'
import { Gender } from 'src/utils/constants'

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MaxLength(32)
    @IsStrongPassword()
    password: string

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string

    @IsNotEmpty()
    @IsDateString()
    dob: string

    @IsNotEmpty()
    gender: Gender
}
