import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsPhoneNumber,
    IsStrongPassword,
    MaxLength,
} from "class-validator"
import { Gender } from "src/utils/constants"

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

    @IsDateString()
    @IsNotEmpty()
    dob: string

    @IsNotEmpty()
    gender: Gender
}
