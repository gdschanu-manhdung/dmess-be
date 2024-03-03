import { InjectRepository } from '@nestjs/typeorm'
import { Friend } from 'src/database/typeorm/entities/friend'
import { FriendsStatus, Services } from 'src/utils/constants'
import { FriendDetails, FriendsRequestQuery } from 'src/utils/types'
import { Repository } from 'typeorm'
import { FriendsRequestDto } from './dto/friendsRequest.dto'
import { IFriendsService } from './friends'
import { Inject } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

export class FriendsService implements IFriendsService {
    constructor(
        @Inject(Services.USERS) private readonly usersService: UsersService,
        @InjectRepository(Friend)
        private readonly friendRepository: Repository<Friend>,
    ) {}
    async sendRequest(friendsRequestDto: FriendsRequestDto) {
        const friendDetails = friendsRequestDto as FriendDetails
        const fromUser = await this.usersService.findUserById(
            friendDetails.fromUserId,
        )
        const toUser = await this.usersService.findUserById(
            friendDetails.toUserId,
        )

        try {
            const params = {
                ...friendDetails,
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
    async rejectRequest(friendDetails: FriendDetails) {
        const requestId = friendDetails.id

        try {
            const request = await this.friendRepository.findOne({
                where: { id: requestId },
            })

            return await this.friendRepository.remove(request)
        } catch (error) {
            console.error(error)
        }
    }
    async acceptRequest(friendDetails: FriendDetails) {
        const requestId = friendDetails.id

        try {
            const request = await this.friendRepository.findOne({
                where: { id: requestId },
            })

            request.status = FriendsStatus.FRIENDS

            return await this.friendRepository.save(request)
        } catch (error) {
            console.error(error)
        }
    }
    async findRequests(friendsRequestQuery: FriendsRequestQuery) {
        let where = {}

        if (friendsRequestQuery.fromUserId) {
            const fromUser = await this.usersService.findUserById(
                friendsRequestQuery.fromUserId,
            )
            where = { ...where, fromUser }
        }

        if (friendsRequestQuery.toUserId) {
            const toUser = await this.usersService.findUserById(
                friendsRequestQuery.toUserId,
            )
            where = { ...where, toUser }
        }

        if (friendsRequestQuery.status) {
            where = { ...where, status: friendsRequestQuery.status }
        }

        console.log(where)

        try {
            const friendsRequest = await this.friendRepository.find({ where })

            console.log(friendsRequest)

            return friendsRequest
        } catch (error) {
            console.error(error)
        }
    }
}
