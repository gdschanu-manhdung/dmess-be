import { User } from "src/database/typeorm/entities/User"
import { UserDetails, FindUserParams } from "src/utils/types"
import { IUsersService } from "./users"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { hashPassword } from "src/utils/helper"

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(userDetails: UserDetails) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: userDetails.email },
            })

            if (existingUser) {
                throw new HttpException(
                    "User with this email already exists",
                    HttpStatus.CONFLICT,
                )
            }

            const password = await hashPassword(userDetails.password)

            const params = { ...userDetails, password, avatarLink: "" }
            const newUser = this.userRepository.create(params)
            return await this.userRepository.save(newUser)
        } catch (error) {
            console.error(error)
        }
    }

    async findUser(findUserParams: FindUserParams) {
        const user = await this.userRepository.findOne({
            where: { email: findUserParams.email },
        })
        console.log(user)
        return user
    }
}
