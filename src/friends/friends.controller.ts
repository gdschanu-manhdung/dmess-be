import { Controller, Inject, UseGuards, Body, Post } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { FriendsRequestDto } from "./dto/friendsRequest.dto"
import { FriendsService } from "./friends.service"

@Controller(Routes.FRIENDS)
export class FriendsController {
    constructor(
        @Inject(Services.FRIENDS) private friendsService: FriendsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("sendRequest")
    async sendRequest(@Body() friendsRequestDto: FriendsRequestDto) {
        this.friendsService.sendRequest(friendsRequestDto)
    }
}
