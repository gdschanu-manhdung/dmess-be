import {
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { Inject } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/utils/guard.auth'
import { Routes, Services } from 'src/utils/constants'
import { ReactionsService } from './reactions.service'
import { Request, Response } from 'express'
import { SendReactionDto } from './dto/sendReaction.dto'

@Controller(Routes.REACTIONS)
export class ReactionsController {
    constructor(
        @Inject(Services.REACTIONS) private reactionsService: ReactionsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('sendReaction')
    async sendReaction(@Req() req: Request, @Res() res: Response) {
        const sendReactionDto = req.body as SendReactionDto

        return res.status(HttpStatus.OK).json({
            reaction: await this.reactionsService.sendReaction(sendReactionDto),
        })
    }
}
