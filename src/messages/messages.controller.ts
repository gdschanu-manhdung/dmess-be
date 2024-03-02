import { Controller, Inject, Post, Req, Res, HttpStatus } from "@nestjs/common"
import { UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { MessagesService } from "./messages.service"
import { Request, Response } from "express"
import { SendMessageDto } from "./dto/SendMessage.dto"

@Controller(Routes.MESSAGES)
export class MessagesController {
    constructor(
        @Inject(Services.MESSAGES) private messagesService: MessagesService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post("sendMessage")
    async sendMessaage(@Req() req: Request, @Res() res: Response) {
        const sendMessageDto = req.body as SendMessageDto

        return res.status(HttpStatus.OK).json({
            message: this.messagesService.createMessage(sendMessageDto),
        })
    }
}
