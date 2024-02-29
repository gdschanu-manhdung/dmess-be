import { InjectRepository } from "@nestjs/typeorm"
import { Friend } from "src/database/typeorm/entities/friend"
import { FriendsStatus, Services } from "src/utils/constants"
import { FriendsDetails } from "src/utils/types"
import { Repository } from "typeorm"
import { FriendsRequestDto } from "./dto/friendsRequest.dto"
import { IFriendsService } from "./friends"
import { Inject } from "@nestjs/common"
import { UsersService } from "src/users/users.service"

export class FriendsService implements IFriendsService {
    constructor(
        @Inject(Services.USERS) private readonly usersService: UsersService,
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
    ) {}
    async sendRequest(friendsRequestDto: FriendsRequestDto) {
        const friendsDetails = friendsRequestDto as FriendsDetails
        const fromUser = await this.usersService.findUserById(
            friendsDetails.fromUserId,
        )
        const toUser = await this.usersService.findUserById(
            friendsDetails.toUserId,
        )

        try {
            const params = {
                ...friendsDetails,
                fromUser,
                toUser,
                status: FriendsStatus.SENT,
            }

            const newFriendsRequest = this.friendRepository.create(params)
            return await this.friendRepository.save(newFriendsRequest)
        } catch (error) {
            console.error(error)
        }
    }
    rejectRequest(friendsDetails: FriendsDetails): Promise<Friend> {
        throw new Error("Method not implemented.")
    }
    acceptRequest(friendsDetails: FriendsDetails): Promise<Friend> {
        throw new Error("Method not implemented.")
    }
    findRequest(friendsDetails: FriendsDetails): Promise<Friend> {
        throw new Error("Method not implemented.")
    }
}
