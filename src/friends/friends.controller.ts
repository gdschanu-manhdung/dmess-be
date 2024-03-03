import {
    Controller,
    Inject,
    UseGuards,
    Body,
    Post,
    Req,
    Res,
    HttpStatus,
    Delete,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { JwtAuthGuard } from 'src/auth/utils/guard.auth'
import { Routes, Services } from 'src/utils/constants'
import { FriendDetails, FriendsRequestQuery } from 'src/utils/types'
import { FriendsRequestDto } from './dto/friendsRequest.dto'
import { FriendsService } from './friends.service'

@Controller(Routes.FRIENDS)
export class FriendsController {
    constructor(
        @Inject(Services.FRIENDS) private friendsService: FriendsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('sendRequest')
    async sendRequest(@Body() friendsRequestDto: FriendsRequestDto) {
        await this.friendsService.sendRequest(friendsRequestDto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('findRequests')
    async findRequests(@Req() req: Request, @Res() res: Response) {
        const friendsRequestQuery = req.body as FriendsRequestQuery

        return res.status(HttpStatus.OK).json({
            requests:
                await this.friendsService.findRequests(friendsRequestQuery),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Delete('rejectRequest')
    async rejectRequest(@Body() friendDetails: FriendDetails) {
        await this.friendsService.rejectRequest(friendDetails)
    }

    @UseGuards(JwtAuthGuard)
    @Post('acceptRequest')
    async acceptRequest(@Body() friendDetails: FriendDetails) {
        await this.friendsService.acceptRequest(friendDetails)
    }
}
