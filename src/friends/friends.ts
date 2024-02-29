import { Friend } from "src/database/typeorm/entities/friend"
import { FriendsDetails } from "src/utils/types"
import { FriendsRequestDto } from "./dto/friendsRequest.dto"

export interface IFriendsService {
    sendRequest(friendsRequestDto: FriendsRequestDto): Promise<Friend>
    rejectRequest(friendsDetails: FriendsDetails): Promise<Friend>
    acceptRequest(friendsDetails: FriendsDetails): Promise<Friend>
    findRequest(friendsDetails: FriendsDetails): Promise<Friend>
}
