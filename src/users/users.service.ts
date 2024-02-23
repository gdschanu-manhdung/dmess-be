import { User } from "src/database/typeorm/entities/User";
import { UserDetails, FindUserParams } from "src/utils/types";
import { IUsersService } from "./users";

export class UsersService implements IUsersService {
    constructor() {}
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    createUser(userDetail: UserDetails): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findUser(findUserParams: FindUserParams): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
