import { User } from 'src/database/typeorm/entities/User';
import { FindUserParams, UserDetail } from 'src/utils/types';

export interface IUserService {
    getUsers(): Promise<User[]>;
    createUser(userDetail: UserDetail): Promise<User>;
    findUser(findUserParams: FindUserParams): Promise<User>;
}
