import {
    Controller,
    Inject,
    UseGuards,
    Get,
    Req,
    Res,
    HttpStatus,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/utils/guard.auth"
import { Routes, Services } from "src/utils/constants"
import { UsersService } from "./users.service"
import { Request, Response } from "express"
import { FindUserParams } from "src/utils/types"

@Controller(Routes.USERS)
export class UsersController {
    constructor(@Inject(Services.USERS) private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("findUser")
    async findUser(@Req() req: Request, @Res() res: Response) {
        const params = req.params as FindUserParams

        return res.status(HttpStatus.OK).json({
            user: this.usersService.findUser(params),
        })
    }
}
