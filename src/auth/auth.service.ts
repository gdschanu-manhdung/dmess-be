import { HttpException, HttpStatus, Inject } from '@nestjs/common'
import { User } from 'src/database/typeorm/entities/User'
import { UsersService } from 'src/users/users.service'
import { Services } from 'src/utils/constants'
import { JwtPayload, ValidateUserDetails } from 'src/utils/types'
import { IAuthService } from './auth'
import { JwtService } from '@nestjs/jwt'
import { UserDetails } from 'src/utils/types'
import { compareHash } from 'src/utils/helper'

export class AuthService implements IAuthService {
    constructor(
        @Inject(Services.USERS) private readonly usersService: UsersService,
        private jwt: JwtService,
    ) {}

    async validateUser(userDetails: UserDetails): Promise<User> {
        const user = await this.usersService.findUserByEmail({
            email: userDetails.email,
        })

        if (!user) {
            throw new HttpException(
                'Invalid Credentials',
                HttpStatus.UNAUTHORIZED,
            )
        }

        const isPasswordValid = await compareHash(
            userDetails.password,
            user.password,
        )

        if (!isPasswordValid) {
            throw new HttpException(
                'Wrong username or password',
                HttpStatus.UNAUTHORIZED,
            )
        }

        console.log(user)

        return user
    }

    generateAccessToken(user: ValidateUserDetails) {
        const payload: JwtPayload = { email: user.email, sub: user.id }

        return this.jwt.sign(payload)
    }

    refreshToken(user: ValidateUserDetails) {
        const payload: JwtPayload = { email: user.email, sub: user.id }

        return this.jwt.sign(payload)
    }
}
