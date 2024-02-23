import { User } from "src/database/typeorm/entities/User"
import { FindUserParams, UserDetails } from "src/utils/types"

export interface IUsersService {
    getUsers(): Promise<User[]>
    createUser(userDetails: UserDetails): Promise<User>
    findUser(findUserParams: FindUserParams): Promise<User>
}
