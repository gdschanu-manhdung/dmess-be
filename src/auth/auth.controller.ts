import {
    Controller,
    UseGuards,
    Post,
    Req,
    Res,
    HttpStatus,
    Inject,
    Body,
} from "@nestjs/common"
import { Routes, Services } from "src/utils/constants"
import { JwtAuthGuard, LocalAuthGuard } from "./utils/guard.auth"
import { Request, Response } from "express"
import { ValidateUserDetails } from "src/utils/types"
import { AuthService } from "./auth.service"
import { UsersService } from "src/users/users.service"
import { CreateUserDto } from "./dto/CreateUser.dto"

@Controller(Routes.AUTH)
export class AuthController {
    constructor(
        @Inject(Services.AUTH) private authService: AuthService,
        @Inject(Services.USERS) private usersService: UsersService,
    ) {}

    @Post("register")
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Req() req: Request, @Res() res: Response) {
        const user = req.user as ValidateUserDetails

        return res.status(HttpStatus.OK).json({
            user: { id: user.id, email: user.email },
            accessToken: this.authService.generateAccessToken(user),
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post("refresh")
    async refreshToken(@Req() req: Request, @Res() res: Response) {
        const user = req.user as ValidateUserDetails

        return res.status(HttpStatus.OK).json({
            accessToken: this.authService.generateAccessToken(user),
        })
    }
}
