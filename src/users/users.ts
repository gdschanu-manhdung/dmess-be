import { Conversation } from 'src/database/typeorm/entities/conversation'
import { User } from 'src/database/typeorm/entities/User'
import {
    FindUserQuery,
    FindUserQueryByEmail,
    UserDetails,
} from 'src/utils/types'

export interface IUsersService {
    createUser(userDetails: UserDetails): Promise<User>
    findUserByEmail(findUserQueryByEmail: FindUserQueryByEmail): Promise<User>
    findUsers(findUserQuery: FindUserQuery): Promise<User[]>
    findUserById(userId: number): Promise<User>
    findConversations(userId: number): Promise<Conversation[]>
}
