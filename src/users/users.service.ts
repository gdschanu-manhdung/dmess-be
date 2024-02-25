import { User } from "src/database/typeorm/entities/User"
import {
    UserDetails,
    FindUserQueryByEmail,
    FindUserQuery,
} from "src/utils/types"
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

    async findUserByEmail(FindUserQueryByEmail: FindUserQueryByEmail) {
        const user = await this.userRepository.findOne({
            where: { email: FindUserQueryByEmail.email },
        })
        return user
    }

    async findUsers(findUserQuery: FindUserQuery): Promise<User[]> {
        const users = await this.userRepository.find({
            where: [
                { email: findUserQuery.email },
                { name: findUserQuery.name },
                { phone: findUserQuery.phone },
            ],
        })
        return users
    }
}
