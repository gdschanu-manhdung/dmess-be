import { Friend } from 'src/database/typeorm/entities/Friend'
import { FriendDetails } from 'src/utils/types'
import { FriendsRequestDto } from './dto/FriendsRequest.dto'

export interface IFriendsService {
    sendRequest(friendsRequestDto: FriendsRequestDto): Promise<Friend>
    rejectRequest(friendDetails: FriendDetails): Promise<Friend>
    acceptRequest(friendDetails: FriendDetails): Promise<Friend>
    findRequests(friendDetails: FriendDetails): Promise<Friend[]>
}
