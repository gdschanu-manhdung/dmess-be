import {
    Controller,
    Inject,
    Post,
    Get,
    Req,
    Res,
    HttpStatus,
} from "@nestjs/common"
import { UseGuards } from "@nestjs/common/decorators"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { Request, Response } from "express"
import { ConversationsService } from "./conversations.service"
import { ConversationDetails, FindConversationQuery } from "src/utils/types"

@Controller(Routes.CONVERSATIONS)
export class ConversationsController {
    constructor(
        @Inject(Services.CONVERSATIONS)
        private conversationsService: ConversationsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("createGroupConversation")
    async createGroupConversation(@Req() req: Request, @Res() res: Response) {
        const conversationDetails = req.body as ConversationDetails

        return res.status(HttpStatus.OK).json({
            conversation:
                this.conversationsService.createGroupConversation(
                    conversationDetails,
                ),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get("getConversationById")
    async getConversationById(@Req() req: Request, @Res() res: Response) {
        const query = req.query as FindConversationQuery

        return res.status(HttpStatus.OK).json({
            conversation:
                await this.conversationsService.findConversationById(query),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post("createPrivateConversation")
    async createPrivateConversation(@Req() req: Request, @Res() res: Response) {
        const conversationDetails = req.body as ConversationDetails

        return res.status(HttpStatus.OK).json({
            conversation:
                this.conversationsService.createPrivateConversation(
                    conversationDetails,
                ),
        })
    }
}
