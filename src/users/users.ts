import { User } from "src/database/typeorm/entities/User"
import { FindUserQuery, UserDetails } from "src/utils/types"

export interface IUsersService {
    createUser(userDetails: UserDetails): Promise<User>
    findUser(findUserQuery: FindUserQuery): Promise<User>
}
