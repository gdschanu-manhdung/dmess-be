import { User } from "src/database/typeorm/entities/User"
import { FindUserParams, UserDetails } from "src/utils/types"

export interface IUsersService {
    createUser(userDetails: UserDetails): Promise<User>
    findUser(findUserParams: FindUserParams): Promise<User>
}
