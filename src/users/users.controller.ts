import {
    Controller,
    Inject,
    UseGuards,
    Get,
    Req,
    Res,
    HttpStatus,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/utils/guard.auth'
import { Routes, Services } from 'src/utils/constants'
import { UsersService } from './users.service'
import { Request, Response } from 'express'
import { FindUserQuery, FindUserQueryByEmail } from 'src/utils/types'

@Controller(Routes.USERS)
export class UsersController {
    constructor(@Inject(Services.USERS) private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('findUserByEmail')
    async findUser(@Req() req: Request, @Res() res: Response) {
        const query = req.query as FindUserQueryByEmail

        return res.status(HttpStatus.OK).json({
            user: await this.usersService.findUserByEmail(query),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('findUsers')
    async findUsers(@Req() req: Request, @Res() res: Response) {
        const query = req.query as FindUserQuery

        return res.status(HttpStatus.OK).json({
            users: await this.usersService.findUsers(query),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Get('findConversations')
    async findConversations(@Req() req: Request, @Res() res: Response) {
        const query = req.query
        const userId = Number(query.userId)

        return res.status(HttpStatus.OK).json({
            conversations: await this.usersService.findConversations(userId),
        })
    }
}
