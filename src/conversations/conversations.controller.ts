import { Controller, Inject, Post, Body } from "@nestjs/common"
import { UseGuards } from "@nestjs/common/decorators"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { Request, Response } from "express"
import { ConversationsService } from "./conversations.service"
import { CreateConversationDto } from "./dto/CreateConversation.dto"

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(
        @Inject(Services.CONVERSATIONS)
        private conversationsService: ConversationsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("createGroupConversation")
    async createGroupConversation(
        @Body() createConversationDto: CreateConversationDto,
    ) {
        this.conversationsService.createGroupConversation(createConversationDto)
    }
}
