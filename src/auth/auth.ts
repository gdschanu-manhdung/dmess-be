import { User } from 'src/database/typeorm/entities/User'
import { ValidateUserDetails } from 'src/utils/types'
import { LoginDto } from './dto/Login.dto'

export interface IAuthService {
    validateUser(loginDto: LoginDto): Promise<User>
    generateAccessToken(user: ValidateUserDetails): string
    refreshToken(user: ValidateUserDetails): string
}
